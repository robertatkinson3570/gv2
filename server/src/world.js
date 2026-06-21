// World state for Milestone 1: a single citaadel zone holding player sessions,
// integrating their movement from input each tick. No collision/bounds yet.

import { SPAWN, SPAWN_JITTER, GOTCHI_SPEED, SPRINT_FACTOR, TICK_MS, TILE_SIZE } from './config.js';
import { isBlocked } from './installations.js';
import { isAarenaBlocked } from './aarenaMap.js';
import { onRoad } from './parcels.js';

// Gotchis move faster on roads (the gaps between parcels).
const ROAD_FACTOR = Number(process.env.ROAD_FACTOR) || 1.6;

// Move a session by (dx,dy) px unless the target tile is blocked; on a block,
// slide along whichever axis is free (so walls don't stick). The blocker depends
// on the map: aarena uses its static tilemap walls (+ finite bounds), the
// citaadel uses on-chain installation footprints.
function tryMove(session, dx, dy) {
  const blocks = session.map === 'aarena' ? isAarenaBlocked : isBlocked;
  const nx = session.x + dx;
  const ny = session.y + dy;
  if (!blocks(Math.floor(nx / TILE_SIZE), Math.floor(ny / TILE_SIZE))) {
    session.x = nx;
    session.y = ny;
    return;
  }
  if (!blocks(Math.floor(nx / TILE_SIZE), Math.floor(session.y / TILE_SIZE))) session.x = nx;
  else if (!blocks(Math.floor(session.x / TILE_SIZE), Math.floor(ny / TILE_SIZE))) session.y = ny;
}

// Direction enum (client `types/index.tsx`) -> unit vector. y+ is down (Phaser).
const DIR_VECTORS = {
  none: { x: 0, y: 0 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
};

/** @typedef {{ id:string, owner:string, name:string, collateralColor:string, level:number, isSpectator:boolean, x:number, y:number, dir:string, sprint:boolean }} Session */

/** All connected sessions, keyed by the ws connection. */
const sessions = new Map();

function jitter() {
  // Deterministic-enough spread without Math.random (kept simple/pure).
  const n = sessions.size;
  return ((n * 137) % (SPAWN_JITTER * 2)) - SPAWN_JITTER;
}

// Security: bound every client-supplied string so a spoofed `enter` can't push
// oversized values into session state (then chat/leaderboard/disk). A gotchi id
// is digits or a 42-char wallet (spectator); names are short; color is a hex.
const clampStr = (v, n) => String(v ?? '').slice(0, n);
const ADDR_RE = /^0x[0-9a-fA-F]{40}$/;

/** Register a player on `enter`. `data` is the client's getPlayerData() payload. */
export function createSession(ws, data) {
  const session = {
    id: clampStr(data.id, 64),
    owner: ADDR_RE.test(data.owner || '') ? String(data.owner) : '',
    name: clampStr(data.name || 'gotchi', 32),
    collateralColor: clampStr(data.collateralColor || '#ffffff', 16),
    level: Math.min(1000, Math.max(1, Number(data.level) || 1)),
    isSpectator: Boolean(data.isSpectator),
    // Which map the player joined. The landing "Join Aarena" button enters with
    // map='aarena' (the dedicated combat arena); everything else is the citaadel.
    // The enter handler overrides x/y with the aarena spawn for arena sessions.
    map: data.map === 'aarena' ? 'aarena' : 'citaadel',
    x: SPAWN.x + jitter(),
    y: SPAWN.y + jitter(),
    dir: 'none',
    sprint: false,
    chatChannel: 'global',
  };
  sessions.set(ws, session);
  return session;
}

export function removeSession(ws) {
  sessions.delete(ws);
}

export function getSession(ws) {
  return sessions.get(ws);
}

/** Build the client `Player` object used in the `enter` spawn response. */
export function toSpawnPlayer(session) {
  return {
    id: session.id,
    name: session.name,
    x: session.x,
    y: session.y,
    collateralColor: session.collateralColor,
    level: session.level,
    health: 100,
    maxHealth: 100,
    isLent: false,
    isDead: false,
    isFocused: false,
    isSpectator: session.isSpectator,
  };
}

/** Apply a `movement/keys` input to a session. */
export function setDirection(session, direction, sprint) {
  if (!session) return;
  session.dir = DIR_VECTORS[direction] ? direction : 'none';
  session.sprint = Boolean(sprint);
}

export function setSprint(session, sprint) {
  if (session) session.sprint = Boolean(sprint);
}

/** Override a session's spawn position (e.g. onto the player's own parcel). */
export function setSpawn(session, x, y) {
  if (!session) return;
  session.x = x;
  session.y = y;
}

/** Click-to-move: head toward a world point. active=false (no position) stops. */
export function setTarget(session, position, sprint) {
  if (!session || !position || typeof position.x !== 'number' || typeof position.y !== 'number') return;
  session.target = { x: position.x, y: position.y };
  session.sprint = Boolean(sprint);
  session.dir = 'none';
}

export function clearTarget(session) {
  if (session) session.target = null;
}

/** Instantly move a session (teleport pad / spawn jump); clears movement intent. */
export function teleport(session, x, y) {
  if (!session) return;
  session.x = x;
  session.y = y;
  session.target = null;
  session.dir = 'none';
  session._wasMoving = true; // emit one settling frame at the new spot
}

/**
 * Advance the world one tick. Integrates moving sessions and returns the list of
 * PositionEvents to broadcast (only players that moved this tick, plus the first
 * frame after they stop so the sprite settles).
 */
export function tick() {
  const events = [];
  const dtScale = TICK_MS / 33; // normalize "per game loop" (~30fps) speed to our tick
  for (const session of sessions.values()) {
    let vec = DIR_VECTORS[session.dir] || DIR_VECTORS.none;
    let moving = vec.x !== 0 || vec.y !== 0;
    const roadBoost = onRoad(Math.floor(session.x / TILE_SIZE), Math.floor(session.y / TILE_SIZE)) ? ROAD_FACTOR : 1;
    const speed = GOTCHI_SPEED * (session.sprint ? SPRINT_FACTOR : 1) * roadBoost * dtScale;

    if (session.target) {
      // Click-to-move: head toward the target world point, settle on arrival.
      const dx = session.target.x - session.x;
      const dy = session.target.y - session.y;
      const dist = Math.hypot(dx, dy);
      if (dist <= speed || dist === 0) {
        tryMove(session, dx, dy);
        session.target = null;
        vec = DIR_VECTORS.none;
        moving = false;
      } else {
        vec = { x: dx / dist, y: dy / dist };
        tryMove(session, vec.x * speed, vec.y * speed);
        moving = true;
      }
    } else if (moving) {
      tryMove(session, vec.x * speed, vec.y * speed);
    }
    // Emit while moving, and one settling frame on the transition to idle.
    if (moving || session._wasMoving) {
      events.push({
        id: session.id,
        x: Math.round(session.x),
        y: Math.round(session.y),
        direction: vec,
        isSprinting: session.sprint,
      });
    }
    session._wasMoving = moving;
  }
  return events;
}

export function sessionCount() {
  return sessions.size;
}

/** Count live sessions currently on a given map ('citaadel' | 'aarena'). */
export function sessionCountOnMap(map) {
  let n = 0;
  for (const s of sessions.values()) if ((s.map || 'citaadel') === map) n++;
  return n;
}

/** Spawn-player objects for every session except `excludeWs` (existing players). */
export function otherSpawnPlayers(excludeWs) {
  const out = [];
  for (const [ws, session] of sessions) {
    if (ws !== excludeWs) out.push(toSpawnPlayer(session));
  }
  return out;
}

/** Run `fn(ws, session)` for every session except `excludeWs`. */
export function forEachOtherSession(excludeWs, fn) {
  for (const [ws, session] of sessions) {
    if (ws !== excludeWs) fn(ws, session);
  }
}

/** Run `fn(ws, session)` for every session (used for chat fan-out). */
export function forEachSession(fn) {
  for (const [ws, session] of sessions) fn(ws, session);
}

/** Find the ws of an existing session for a gotchi id (reconnect dedupe). */
export function findSessionByGotchiId(id) {
  for (const [ws, session] of sessions) {
    if (session.id === String(id)) return ws;
  }
  return null;
}
