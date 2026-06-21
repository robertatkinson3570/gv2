// WebSocket message gateway: parses the client's {channel, data} frames and
// dispatches the Milestone 1 channels (enter, movement, ping). Outgoing frames
// use the same envelope the client expects.

import { WebSocket } from 'ws';
import {
  createSession,
  removeSession,
  getSession,
  toSpawnPlayer,
  setDirection,
  setSprint,
  setSpawn,
  setTarget,
  clearTarget,
  teleport,
  otherSpawnPlayers,
  forEachOtherSession,
  forEachSession,
  findSessionByGotchiId,
} from './world.js';

// #9 anti-cheat: cap how far a single teleport may jump (px). Movement via
// keys/mouse is already server-integrated at a fixed speed; teleport is the one
// channel that sets position directly, so bound it to block "warp anywhere".
const MAX_TELEPORT_PX = Number(process.env.MAX_TELEPORT_PX) || 8000;
import { fetchOwnerParcels, loadAllParcels, fetchNearbyBuiltParcels } from './parcels.js';
import { fetchParcelInstallations, fetchParcelTiles } from './installations.js';
import { nftFor } from './nftDisplayStore.js';
import { itemsNear, collectAt, totalItems, registerParcelProducers } from './alchemica.js';
import { loadPlayer, savePlayer } from './playerStore.js';
import { verifyGotchiAccess } from './auth.js';
import { verifySiwe, addrEq } from './siwe.js';
import { enemiesNear, clearEnemiesNear } from './combat.js';
import { initProgress, addProgress } from './progression.js';

/** Notify a player of a completed quest via a SERVER chat line. */
function notifyQuests(ws, completed) {
  for (const q of completed) {
    send(ws, 'chat', {
      type: 'SERVER',
      id: 'quest',
      name: 'Quest',
      time: Date.now(),
      message: `Quest complete: ${q.label} (+${q.reward} XP)`,
      channel: 'global',
    });
  }
}

// #5 combat master switch lives in config.js (single source of truth, also read
// by the http config endpoint). Re-exported so index.js keeps importing it here.
// When on, the aarena is a live Lickquidator combat zone; the citaadel stays peaceful.
import { COMBAT_ENABLED } from './config.js';
export { COMBAT_ENABLED };

// #8: enforce gotchi-ownership at join (kick spoofers). Secure by default;
// set ENFORCE_AUTH=false for keyless local dev where you can't sign.
const ENFORCE_AUTH = process.env.ENFORCE_AUTH !== 'false';
// SIWE: require a wallet signature at `enter` proving control of the claimed
// `owner`. Secure by default; set REQUIRE_SIWE=false for keyless local testing.
// Spectators (id is a wallet address, own nothing) are exempt.
const REQUIRE_SIWE = process.env.REQUIRE_SIWE !== 'false';
import {
  handleGameAction,
  handleAlchemicaAction,
  handleCombatAction,
  handleInstallationsAction,
} from './gameActions.js';
import { TILE_SIZE, AARENA_SPAWN, AARENA_SPAWN_JITTER, AARENA_SPAWN_GRACE_MS } from './config.js';

// The full map is 55k parcels — rendering them all at once overwhelms Phaser, so
// stream a large-but-bounded region around the player and cull as they leave it.
// Tunable: bigger radius/cap = more visible map, heavier client.
const PARCEL_RADIUS = Number(process.env.PARCEL_RADIUS) || 1100; // tiles — prefetch distance
const PARCEL_CAP = Number(process.env.PARCEL_CAP) || 2000; // max parcels rendered at once
const PARCEL_CULL_RADIUS = Number(process.env.PARCEL_CULL_RADIUS) || PARCEL_RADIUS + 500;
const PARCEL_CHUNK = 2000;

/** The (up to PARCEL_CAP) parcel ids nearest (gx,gy) within PARCEL_RADIUS. */
function nearbyParcelIds(gx, gy) {
  const r2 = PARCEL_RADIUS * PARCEL_RADIUS;
  const within = [];
  for (const p of loadAllParcels()) {
    const dx = p.gx - gx;
    const dy = p.gy - gy;
    const d2 = dx * dx + dy * dy;
    if (d2 <= r2) within.push({ id: p.id, d2 });
  }
  within.sort((a, b) => a.d2 - b.d2);
  return within.slice(0, PARCEL_CAP).map((p) => p.id);
}

/** Send parcel ids to a client in chunks (one `parcels` frame per chunk). */
function streamParcelIds(ws, ids) {
  for (let i = 0; i < ids.length; i += PARCEL_CHUNK) {
    send(ws, 'parcels', ids.slice(i, i + PARCEL_CHUNK).map((id) => ({ id })));
  }
}

// Read + stream installations for every BUILT parcel near (gx,gy) the player
// hasn't seen yet (owned or not), nearest first. Empty parcels are filtered out
// by the subgraph so only real buildings cost a grid read.
const INSTALL_AOI_CAP = 80;
async function streamBuiltInstallations(ws, session, gx, gy) {
  if (!session.installSent) session.installSent = new Set();
  // ROOT CAUSE FIX: query a TIGHT window. A large window + `first:1000` is
  // truncated by the subgraph to a far geographic cluster (parcels 1700+ tiles
  // away), so the spawn's real neighbours — and the spawn parcel itself — get
  // dropped, and only my one cached test area ever showed installations.
  const others = await fetchNearbyBuiltParcels(gx, gy, 300);
  // GUARANTEE the player's own parcels near here: we already hold their
  // tokenId/size, so no subgraph truncation can drop the parcel they stand on.
  const ownedNear = (session.ownedParcels || []).filter((p) => Math.hypot(p.gridX - gx, p.gridY - gy) < 320);
  const byId = new Map();
  for (const p of [...others, ...ownedNear]) byId.set(p.id, p);
  const fresh = [...byId.values()]
    .filter((p) => !session.installSent.has(p.id))
    .sort((a, b) => Math.hypot(a.gridX - gx, a.gridY - gy) - Math.hypot(b.gridX - gx, b.gridY - gy))
    .slice(0, INSTALL_AOI_CAP);
  if (!fresh.length) return;
  for (const p of fresh) session.installSent.add(p.id);
  if (!session.installItems) session.installItems = new Map();
  // Stream in small batches, nearest-first, so the parcel the player is standing
  // on (and its neighbors) appear in ~1s instead of waiting for all ~80 to read.
  const BATCH = 8;
  let totalInstalls = 0;
  for (let i = 0; i < fresh.length; i += BATCH) {
    const batch = fresh.slice(i, i + BATCH);
    const installs = await fetchParcelInstallations(batch);
    for (const p of batch) {
      const ids = installs.filter((it) => String(it.id).startsWith(`${p.id}_`)).map((it) => it.id);
      if (ids.length) {
        registerParcelProducers(p.id, p.gridX, p.gridY, ids);
        session.installItems.set(p.id, ids); // track for culling as the player roams
      }
    }
    if (installs.length) {
      totalInstalls += installs.length;
      // Attach each NFT-display installation's stored pick so it renders for this
      // viewer (the "reset your fakes & it sticks" feature — see nftDisplayStore).
      const withNft = installs.map((it) => {
        const nft = nftFor(it.id);
        return nft ? { id: it.id, nft } : it;
      });
      send(ws, 'enter', { installation: withNft });
    }
  }
  if (totalInstalls) console.log(`[ws]   + ${totalInstalls} installation(s) across ${fresh.length} parcel(s)`);
  // Floor tiles are a separate grid (walkable, no collision). Only parcels the
  // subgraph marks as tiled get read; owned parcels (no flag) are read too.
  const tiled = fresh.filter((p) => p.tiled !== false);
  if (tiled.length) {
    const tiles = await fetchParcelTiles(tiled);
    if (tiles.length) {
      send(ws, 'enter', { tile: tiles });
      console.log(`[ws]   + ${tiles.length} tile(s) across ${tiled.length} parcel(s)`);
    }
  }
}

// --- Alchemica gathering ---
const ALCH_STREAM_RADIUS = 1600; // px — items streamed within this of the player
const ALCH_CULL_RADIUS = 2600; // px — items beyond this are removed from view
const ALCH_TARGET = 28; // items kept near each player
const ALCH_MAX_ITEMS = 2500; // global cap on ground items
const ALCH_CAPACITY = Number(process.env.ALCH_CAPACITY) || 2000;

// Stream ground alchemica near the player (spawning more if the area is sparse)
// and cull items they've left behind, so the client's item set stays bounded.
export function streamAlchemica(ws, session) {
  if (!session.alchSent) session.alchSent = new Set();
  const near = itemsNear(session.x, session.y, ALCH_STREAM_RADIUS);
  const keep = new Set(itemsNear(session.x, session.y, ALCH_CULL_RADIUS).map((it) => it.id));
  const fresh = near.filter((it) => !session.alchSent.has(it.id));
  for (const it of fresh) session.alchSent.add(it.id);
  if (fresh.length) {
    send(ws, 'enter', {
      // created:false => appear instantly (created:true is the spillover bounce-in
      // animation with an up-to-10s random delay, wrong for gatherable ground items).
      item: fresh.map((it) => ({ id: it.id, x: it.x, y: it.y, label: it.label, quantity: it.quantity, created: false })),
    });
  }
  const cull = [];
  for (const id of session.alchSent) if (!keep.has(id)) cull.push(id);
  for (const id of cull) session.alchSent.delete(id);
  if (cull.length) send(ws, 'leave', { item: cull.map((id) => ({ id })) });
}

// Server-authoritative pickup: collect items the player is standing on into
// their carried balance (FUD/FOMO/ALPHA/KEK), capped at capacity, and tell
// everyone those items are gone. Called from the pickup loop in index.js.
export function collectAlchemica(ws, session) {
  if (!session) return;
  if (!session.carried) session.carried = [0, 0, 0, 0];
  const sum = session.carried[0] + session.carried[1] + session.carried[2] + session.carried[3];
  if (sum >= ALCH_CAPACITY) return;
  const got = collectAt(session.x, session.y);
  if (!got.length) return;
  for (const it of got) session.carried[it.type] += it.quantity;
  if (session.alchSent) for (const it of got) session.alchSent.delete(it.id);
  // #6 progression: count gathered toward the gather quest (+ XP).
  notifyQuests(
    ws,
    addProgress(session, 'gathered', got.reduce((a, it) => a + it.quantity, 0)),
  );
  const alchemicaSum = session.carried[0] + session.carried[1] + session.carried[2] + session.carried[3];
  const ids = got.map((it) => ({ id: it.id }));
  forEachSession((otherWs) => send(otherWs, 'items', { action: 'destroy', items: ids }));
  send(ws, 'items', {
    action: 'update',
    playerItems: { id: session.id, alchemica: session.carried, alchemicaSum },
    triggerSound: `pickup_${got[0].label}_sound_small`,
  });
  if (alchemicaSum >= ALCH_CAPACITY) send(ws, 'items', { action: 'full-pocket' });
}

// Stream Lickquidators near the player (and cull far ones), like alchemica.
const ENEMY_STREAM_RADIUS = 1800; // px
const ENEMY_CULL_RADIUS = 2700; // px
export function streamEnemies(ws, session) {
  if (!session.enemySent) session.enemySent = new Set();
  const near = enemiesNear(session.x, session.y, ENEMY_STREAM_RADIUS);
  const keep = new Set(enemiesNear(session.x, session.y, ENEMY_CULL_RADIUS).map((e) => e.id));
  const fresh = near.filter((e) => !session.enemySent.has(e.id));
  for (const e of fresh) session.enemySent.add(e.id);
  if (fresh.length) {
    send(ws, 'enter', {
      enemy: fresh.map((e) => ({ id: e.id, x: e.x, y: e.y, name: e.name, type: e.type, health: e.health, maxHealth: e.maxHealth, created: true })),
    });
  }
  const cull = [];
  for (const id of session.enemySent) if (!keep.has(id)) cull.push(id);
  for (const id of cull) session.enemySent.delete(id);
  if (cull.length) send(ws, 'leave', { enemy: cull.map((id) => ({ id })) });
}

// Spread arena spawns around the center without stacking (no Math.random needed).
let _arenaSeq = 0;
function arenaJitter() {
  _arenaSeq++;
  return ((_arenaSeq * 211) % (AARENA_SPAWN_JITTER * 2)) - AARENA_SPAWN_JITTER;
}

// Drop a player into the dedicated aarena combat map: spawn at the arena center,
// stream NO citaadel parcels/installations/alchemica, announce combat state, and
// show only other aarena players (citaadel players live in a far coordinate space).
function enterAarena(ws, session) {
  const saved = loadPlayer(session.id);
  setSpawn(session, AARENA_SPAWN.x + arenaJitter(), AARENA_SPAWN.y + arenaJitter());
  // AOI is parcel-streaming state; the arena streams nothing, so keep it inert.
  session.aoi = { cx: 0, cy: 0, sent: new Set() };
  session.installSent = new Set();
  session.ownedParcels = [];
  console.log(`[ws] enter(aarena): gotchi ${session.id} (${session.name}) at (${Math.round(session.x)},${Math.round(session.y)})`);
  send(ws, 'connection-success', {
    ...toSpawnPlayer(session),
    playerWallet: { FUD: 0, FOMO: 0, ALPHA: 0, KEK: 0 },
    health: 100,
    traits: {},
    traitsBases: {},
    wearableTraitBonuses: {},
  });
  send(ws, 'game-config-update', { combatIsLive: COMBAT_ENABLED, miniGameMode: false });
  // #6 progression (xp + daily quests) carries across maps.
  session.carried = saved.carried;
  session.wallet = saved.wallet;
  initProgress(session, saved);
  send(ws, 'chat', {
    type: 'SERVER',
    id: 'realm',
    name: 'Realm',
    time: Date.now(),
    message: `Welcome to the Aarena! Defeat the Lickquidators. XP ${session.xp}.`,
    channel: 'global',
  });
  // #5 combat state. Spawn protection so the first seconds in the arena aren't an
  // instant death into the Lickquidator swarm (see AARENA_SPAWN_GRACE_MS).
  session.health = 100;
  session.maxHealth = 100;
  session.ap = 50;
  session.maxAP = 50;
  session.isDead = false;
  session.combatGraceUntil = Date.now() + AARENA_SPAWN_GRACE_MS;
  // Presence, scoped to the arena (don't show or notify citaadel players).
  const others = [];
  forEachOtherSession(ws, (_otherWs, s) => {
    if (s.map === 'aarena') others.push(toSpawnPlayer(s));
  });
  if (others.length) send(ws, 'enter', { player: others });
  forEachOtherSession(ws, (otherWs, s) => {
    if (s.map === 'aarena') send(otherWs, 'enter', { player: [toSpawnPlayer(session)] });
  });
}

// Apply combat damage to an arena player. Shared by the Lickquidator AI (PVE)
// and by player fire (PVP) so death/respawn behave identically. Honors spawn
// protection + death, broadcasts the health bar to everyone in the arena, and on
// death sends the kill and schedules a protected respawn (clears the local swarm
// and re-grants grace so the victim doesn't instantly die again).
export function damageArenaPlayer(ws, session, dmg, attackerName) {
  if (!session || session.isDead || Date.now() < (session.combatGraceUntil || 0)) return;
  session.health = Math.max(0, (session.health ?? 100) - dmg);
  forEachSession((w, s) => {
    if (s.map === 'aarena') send(w, 'health-changed', { id: session.id, health: session.health, damage: dmg, type: 'player' });
  });
  if (session.health > 0) return;
  session.isDead = true;
  send(ws, 'death', { respawnDelay: 5000, attackerName: attackerName || 'Lickquidator', damageType: 'melee', deathTime: Date.now() });
  setTimeout(() => {
    if (!session) return;
    session.health = session.maxHealth ?? 100;
    session.isDead = false;
    const cleared = clearEnemiesNear(session.x, session.y, 2200);
    if (cleared.length) forEachSession((w, s) => { if (s.map === 'aarena') send(w, 'leave', { enemy: cleared.map((id) => ({ id })) }); });
    session.combatGraceUntil = Date.now() + AARENA_SPAWN_GRACE_MS;
    send(ws, 'respawn', {});
    send(ws, 'health-changed', { id: session.id, health: session.health, type: 'player' });
  }, 5000);
}

/** Build the action-handler context (send helpers + owned-installation reader). */
function makeActionCtx(ws, session) {
  return {
    session,
    sendSelf: (channel, data) => send(ws, channel, data),
    sendOthers: (channel, data) => forEachOtherSession(ws, (otherWs) => send(otherWs, channel, data)),
    sendAll: (channel, data) => forEachSession((otherWs) => send(otherWs, channel, data)),
    // PVP: damage the nearest OTHER arena player within `range` px of the shooter.
    damageNearestPlayer: (range, dmg, attackerName) => {
      let best = null;
      let bestD2 = range * range;
      forEachOtherSession(ws, (otherWs, s) => {
        if (s.map !== 'aarena' || s.isDead) return;
        const dx = s.x - session.x;
        const dy = s.y - session.y;
        const d2 = dx * dx + dy * dy;
        if (d2 <= bestD2) { bestD2 = d2; best = { ws: otherWs, session: s }; }
      });
      if (best) damageArenaPlayer(best.ws, best.session, dmg, attackerName);
    },
    ownedNearInstallations: async () => {
      const owned = session.ownedParcels || [];
      const gx = Math.round(session.x / TILE_SIZE);
      const gy = Math.round(session.y / TILE_SIZE);
      const near = owned.filter((p) => Math.hypot(p.gridX - gx, p.gridY - gy) < 1200).slice(0, 16);
      return fetchParcelInstallations(near);
    },
  };
}

/** Send one {channel, data} frame to a single client. */
export function send(ws, channel, data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ channel, data }));
  }
}

/** Send one frame to every open client. */
export function broadcast(wss, channel, data) {
  const frame = JSON.stringify({ channel, data });
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) client.send(frame);
  }
}

// Security: per-connection token-bucket rate limiting. Every channel was
// previously unbounded, so one socket could flood chat (N× amplification),
// spam `enter` (kick-griefing), spam `teleport` (warp-vacuum), or spam
// `combat`. Buckets are keyed by ws so they cover pre-session frames (`enter`)
// too, and are GC'd with the socket via the WeakMap.
const RL = new WeakMap();
function allow(ws, cat, ratePerSec, burst) {
  let s = RL.get(ws);
  if (!s) { s = {}; RL.set(ws, s); }
  const now = Date.now();
  let b = s[cat];
  if (!b) { b = { tokens: burst, last: now }; s[cat] = b; }
  b.tokens = Math.min(burst, b.tokens + ((now - b.last) / 1000) * ratePerSec);
  b.last = now;
  if (b.tokens < 1) return false;
  b.tokens -= 1;
  return true;
}
// Per-channel [rate/sec, burst]. Tuned generously for real play; an order of
// magnitude below what a scripted flood does.
const RL_LIMITS = {
  enter: [0.5, 2],
  movement: [40, 60],
  chat: [3, 6],
  'bubble-chat': [4, 6],
  interaction: [6, 10],
  'game-actions': [5, 10],
  alchemica: [4, 8],
  combat: [12, 18],
  installations: [3, 6],
  ping: [4, 8],
};
// Min interval between teleports (ms) on top of the per-hop distance cap, so
// bounded hops can't be chained into a cross-map warp (#9 anti-cheat).
const TELEPORT_COOLDOWN_MS = Number(process.env.TELEPORT_COOLDOWN_MS) || 500;

/** Handle one inbound frame from a client. */
export function handleMessage(ws, raw) {
  // Drop anything past a global ceiling first (covers every channel + unknowns).
  if (!allow(ws, '_global', 80, 160)) return;
  let msg;
  try {
    msg = JSON.parse(typeof raw === 'string' ? raw : raw.toString());
  } catch {
    console.warn('[ws] dropped malformed frame');
    return;
  }
  const { channel, data } = msg || {};

  // Per-channel rate limit. Over-limit frames are silently dropped.
  const lim = RL_LIMITS[channel];
  if (lim && !allow(ws, channel, lim[0], lim[1])) return;

  switch (channel) {
    case 'enter': {
      // data is the client's getPlayerData() payload (id, owner, name, ...).
      // SIWE: prove the connection controls the claimed `owner` wallet before we
      // trust the identity. Spectators (id is a 0x wallet, own nothing) skip it.
      const isSpectator = Boolean(data?.isSpectator) || String(data?.id || '').startsWith('0x');
      const siweResult = isSpectator ? { ok: true, address: '' } : verifySiwe(data?.siwe);
      const authed = isSpectator || (siweResult.ok && addrEq(siweResult.address, data?.owner));
      if (REQUIRE_SIWE && !authed) {
        console.warn(`[auth] SIWE reject gotchi ${data?.id} for ${data?.owner}: ${siweResult.reason || 'owner-mismatch'}`);
        send(ws, 'kicked', { message: 'Wallet signature required to enter.', unrecoverableSocketError: true });
        return;
      }
      // #9 reconnection: if this gotchi already has a live session, displace the
      // old one. Anti-grief: only a connection that proved control of the SAME
      // wallet that holds the session may displace it (an attacker quoting a
      // public gotchi id can't forge that). Legacy new-wins when SIWE is off.
      const dupWs = findSessionByGotchiId(data?.id);
      let inheritedPos = null;
      if (dupWs && dupWs !== ws) {
        const dupSession = getSession(dupWs);
        // Carry the prior session's position over so a reconnect/re-enter without
        // a spawnLocId resumes where the player was — not back at owned[0].
        if (dupSession && Number.isFinite(dupSession.x)) inheritedPos = { x: dupSession.x, y: dupSession.y };
        const mayDisplace = !REQUIRE_SIWE || isSpectator || (authed && dupSession && addrEq(siweResult.address, dupSession.owner));
        if (mayDisplace) {
          send(dupWs, 'kicked', { message: 'A new connection for this account was made.', unrecoverableSocketError: false });
          handleClose(dupWs);
          try {
            dupWs.close();
          } catch {
            /* already closing */
          }
        } else {
          // A different (or unauthenticated) wallet may not boot the incumbent.
          console.warn(`[auth] blocked kick-attempt on gotchi ${data?.id} by ${siweResult.address || data?.owner}`);
          send(ws, 'kicked', { message: 'This gotchi is already in-world from another session.', unrecoverableSocketError: true });
          return;
        }
      }
      const session = createSession(ws, data || {});
      session.authed = authed;
      session.authedAddress = siweResult.address || '';
      // M2: fetch the player's real Base parcels, spawn them onto their own land,
      // then send the parcel ids so the client renders them (it colors the ones
      // it owns from its own ownedParcels state). connection-success carries the
      // final spawn, so it must be sent after the parcel lookup resolves.
      fetchOwnerParcels(session.owner).then(async (owned) => {
        // #8 anti-spoof: verify the wallet owns or rents this gotchi.
        const access = await verifyGotchiAccess(session.owner, session.id);
        if (!access.ok) {
          console.warn(`[auth] DENY gotchi ${session.id} for ${session.owner}: ${access.reason}`);
          if (ENFORCE_AUTH) {
            send(ws, 'kicked', { message: 'You do not own or rent this gotchi.', unrecoverableSocketError: true });
            return;
          }
          session.unverified = true;
        } else if (access.reason === 'owner' || access.reason === 'borrower') {
          console.log(`[auth] verified gotchi ${session.id} for ${session.owner} (${access.reason})`);
        }
        // Dedicated aarena combat map: a different coordinate space with no
        // parcels. Spawn into the arena and skip all citaadel streaming below.
        if (session.map === 'aarena') {
          enterAarena(ws, session);
          return;
        }
        // Spawn priority: (1) the parcel the player selected (data.spawnLocId,
        // a parcelId "C-<x>-<y>-..."); (2) on a re-enter WITHOUT a selection,
        // resume their last position (inherited from the kicked session, or
        // persisted) — this is the fix for "it keeps defaulting to that parcel";
        // (3) their first owned parcel; (4) the default spawn.
        const saved = loadPlayer(session.id);
        const resumePos = inheritedPos || (Number.isFinite(saved.lastX) ? { x: saved.lastX, y: saved.lastY } : null);
        let centerX, centerY;
        const sel = data?.spawnLocId ? String(data.spawnLocId).split('-') : null;
        const selX = sel ? Number(sel[1]) : NaN;
        const selY = sel ? Number(sel[2]) : NaN;
        if (Number.isFinite(selX) && Number.isFinite(selY)) {
          setSpawn(session, selX * TILE_SIZE + TILE_SIZE, selY * TILE_SIZE + TILE_SIZE);
          centerX = selX;
          centerY = selY;
        } else if (resumePos && Number.isFinite(resumePos.x)) {
          setSpawn(session, resumePos.x, resumePos.y);
          centerX = Math.round(resumePos.x / TILE_SIZE);
          centerY = Math.round(resumePos.y / TILE_SIZE);
        } else if (owned.length) {
          setSpawn(session, owned[0].x + TILE_SIZE, owned[0].y + TILE_SIZE);
          centerX = owned[0].gridX;
          centerY = owned[0].gridY;
        } else {
          centerX = Math.round(session.x / TILE_SIZE);
          centerY = Math.round(session.y / TILE_SIZE);
        }
        // AOI state: center, the set of parcel ids currently streamed (for
        // prefetch + cull), and which parcels' installations we've sent.
        session.aoi = { cx: centerX, cy: centerY, sent: new Set() };
        session.installSent = new Set();

        console.log(
          `[ws] enter: gotchi ${session.id} (${session.name}), ${owned.length} owned, spawn (${Math.round(session.x)},${Math.round(session.y)})`,
        );
        // `connection-success` is the client's "you're in" message: it spawns the
        // player (onPlayerSocketInit -> addPlayers), follows the camera, inits the
        // map, and flips `connected` true — which lifts the loading screen.
        send(ws, 'connection-success', {
          ...toSpawnPlayer(session),
          playerWallet: { FUD: 0, FOMO: 0, ALPHA: 0, KEK: 0 },
          health: 100,
          traits: {},
          traitsBases: {},
          wearableTraitBonuses: {},
        });
        // Push server game config (partial-merged into the client's gameConfig).
        send(ws, 'game-config-update', { combatIsLive: COMBAT_ENABLED, miniGameMode: false });
        // Stream the region around the spawn (the client derives each parcel's
        // position from its id). More stream in ahead of the player as they roam,
        // and far ones cull, so the rendered count stays smooth.
        const nearbyIds = nearbyParcelIds(centerX, centerY);
        session.aoi.sent = new Set(nearbyIds);
        streamParcelIds(ws, nearbyIds);
        console.log(`[ws]   + ${nearbyIds.length} parcels in view (of ${loadAllParcels().length})`);
        // Render installations on EVERY built parcel near the spawn — owned and
        // everyone else's — read from the on-chain grids (Aaltars, harvesters,
        // reservoirs at their real positions). More stream in as the player roams.
        session.ownedParcels = owned;
        // Restore persisted progress (carried alchemica + in-game wallet); `saved`
        // was already loaded above for the spawn-resume logic.
        session.carried = saved.carried;
        session.wallet = saved.wallet;
        initProgress(session, saved); // #6 progression (xp + daily quests)
        send(ws, 'chat', {
          type: 'SERVER',
          id: 'realm',
          name: 'Realm',
          time: Date.now(),
          message: `Welcome to the Gotchiverse! XP ${session.xp}. Quests: gather alchemica + defeat Lickquidators.`,
          channel: 'global',
        });
        // #5 combat state (used when COMBAT_ENABLED).
        session.health = 100;
        session.maxHealth = 100;
        session.ap = 50;
        session.maxAP = 50;
        session.isDead = false;
        const carriedSum = session.carried.reduce((a, b) => a + b, 0);
        if (carriedSum > 0) {
          send(ws, 'items', { action: 'update', playerItems: { id: session.id, alchemica: session.carried, alchemicaSum: carriedSum } });
        }
        if (session.wallet.some((v) => v > 0)) {
          send(ws, 'items', {
            action: 'player-wallet-update',
            items: { fud: session.wallet[0], fomo: session.wallet[1], alpha: session.wallet[2], kek: session.wallet[3] },
          });
        }
        // Alchemica gathering: seed + stream ground items first — it's instant.
        streamAlchemica(ws, session);
        await streamBuiltInstallations(ws, session, centerX, centerY);
        // M4 presence: show the newcomer everyone already here, and show everyone
        // else the newcomer. Positions then sync via the broadcast tick.
        const others = otherSpawnPlayers(ws);
        if (others.length) send(ws, 'enter', { player: others });
        forEachOtherSession(ws, (otherWs) => send(otherWs, 'enter', { player: [toSpawnPlayer(session)] }));
      });
      break;
    }
    case 'movement': {
      // data = { action, data: {...}, sent }
      const session = getSession(ws);
      const action = data?.action;
      const payload = data?.data || {};
      if (action === 'keys') {
        setDirection(session, payload.direction, payload.isSprint);
      } else if (action === 'toggle_sprint') {
        setSprint(session, Boolean(payload.action));
      } else if (action === 'mouse') {
        // Click-to-move: { position:{x,y}, active, sprint }. active=false => stop.
        if (payload.active && payload.position) setTarget(session, payload.position, payload.sprint);
        else clearTarget(session);
      } else if (action === 'teleport') {
        // Teleport pad / spawn jump: { x, y } or { position:{x,y} }. Bounded so a
        // client can't warp across the map to vacuum alchemica (#9 anti-cheat).
        const pos = payload.position || payload;
        if (session && typeof pos.x === 'number' && typeof pos.y === 'number') {
          const now = Date.now();
          // Cooldown: bounded hops can't be chained into a cross-map warp.
          if (session._lastTp && now - session._lastTp < TELEPORT_COOLDOWN_MS) {
            console.warn(`[anti-cheat] teleport cooldown for gotchi ${session.id}`);
            break;
          }
          const dist = Math.hypot(pos.x - session.x, pos.y - session.y);
          if (dist <= MAX_TELEPORT_PX) {
            session._lastTp = now;
            teleport(session, pos.x, pos.y);
          } else console.warn(`[anti-cheat] rejected ${Math.round(dist)}px teleport for gotchi ${session.id}`);
        }
      }
      break;
    }
    case 'ping': {
      send(ws, 'pong', { sent: data?.sent });
      break;
    }
    case 'chat': {
      // { action: 'post'|'subscribe'|'unsubscribe', message?, channel? }
      const session = getSession(ws);
      if (!session) break;
      if (data?.action === 'subscribe' && data.channel) {
        session.chatChannel = data.channel;
      } else if (data?.action === 'post' && data.message) {
        // ChatEvent the client renders: { type, id, name, time, message, channel }
        const event = {
          type: 'USER',
          id: session.id,
          name: session.name,
          time: Date.now(),
          message: String(data.message).slice(0, 500),
          channel: session.chatChannel || 'global',
        };
        forEachSession((otherWs) => send(otherWs, 'chat', event));
      }
      break;
    }
    case 'bubble-chat': {
      // Above-head chat bubble / typing indicator, shown on the sender's sprite.
      const session = getSession(ws);
      if (!session) break;
      forEachSession((otherWs) => send(otherWs, 'bubble-chat', { id: session.id, message: data?.message, state: data?.state }));
      break;
    }
    case 'interaction': {
      // emote / spin / focus. The client sends these without an id, so inject the
      // sender's gotchi id and fan out to everyone (incl. the sender, who renders
      // their own emote when the server echoes it back).
      const session = getSession(ws);
      if (!session) break;
      const out = { ...(data || {}), data: { ...((data && data.data) || {}), id: session.id } };
      forEachSession((otherWs) => send(otherWs, 'interaction', out));
      break;
    }
    case 'game-actions': {
      const session = getSession(ws);
      if (session) handleGameAction(makeActionCtx(ws, session), data);
      break;
    }
    case 'alchemica': {
      const session = getSession(ws);
      if (session) handleAlchemicaAction(makeActionCtx(ws, session), data);
      break;
    }
    case 'combat': {
      const session = getSession(ws);
      if (session) handleCombatAction(makeActionCtx(ws, session), data);
      break;
    }
    case 'installations': {
      const session = getSession(ws);
      if (session) void handleInstallationsAction(makeActionCtx(ws, session), data);
      break;
    }
    // socket-transfer / beta-admin-command: ignored.
    default:
      break;
  }
}

export function handleClose(ws) {
  const session = getSession(ws);
  if (session) {
    console.log(`[ws] leave: gotchi ${session.id}`);
    // Persist progress (carried alchemica + in-game wallet) on disconnect.
    if (session.carried || session.wallet) savePlayer(session.id, session);
    // M4 presence: tell everyone else to remove this player's sprite.
    forEachOtherSession(ws, (otherWs) => send(otherWs, 'leave', { player: [{ id: session.id }] }));
  }
  removeSession(ws);
}

// AOI: when a session has roamed far enough from its last center, prefetch the
// parcels now in range (ahead of the player), cull the ones left behind, and
// fill in installations. Refresh distance < prefetch radius so parcels are
// always loaded before the player reaches them.
const AOI_REFRESH_TILES = Number(process.env.AOI_REFRESH_TILES) || 300;
const INSTALL_CULL_TILES = Number(process.env.INSTALL_CULL_TILES) || 1700;

export async function updateAoi(ws, session) {
  if (!session?.aoi) return;
  const gx = Math.round(session.x / TILE_SIZE);
  const gy = Math.round(session.y / TILE_SIZE);
  if (Math.hypot(gx - session.aoi.cx, gy - session.aoi.cy) < AOI_REFRESH_TILES) return;
  session.aoi.cx = gx;
  session.aoi.cy = gy;

  // Lazy-load: stream parcels newly within the prefetch radius (ahead of the
  // player) and cull ones now far behind, keeping the rendered set bounded.
  const nearbyIds = nearbyParcelIds(gx, gy);
  const nearbySet = new Set(nearbyIds);
  const fresh = nearbyIds.filter((id) => !session.aoi.sent.has(id));
  for (const id of fresh) session.aoi.sent.add(id);
  if (fresh.length) streamParcelIds(ws, fresh);

  const cull = [];
  for (const id of session.aoi.sent) {
    if (nearbySet.has(id)) continue;
    const parts = id.split('-');
    const px = Number(parts[1]);
    const py = Number(parts[2]);
    if (Number.isFinite(px) && Number.isFinite(py) && Math.hypot(px - gx, py - gy) > PARCEL_CULL_RADIUS) cull.push(id);
  }
  for (const id of cull) session.aoi.sent.delete(id);
  if (cull.length) send(ws, 'leave', { parcel: cull.map((id) => ({ id })) });

  // Cull installations on parcels now far behind, bounding the client sprite
  // count on long roams (parcelId "C-<x>-<y>-..." gives the distance).
  if (session.installItems) {
    const cullInstalls = [];
    for (const [pid, ids] of session.installItems) {
      const parts = pid.split('-');
      const px = Number(parts[1]);
      const py = Number(parts[2]);
      if (Number.isFinite(px) && Number.isFinite(py) && Math.hypot(px - gx, py - gy) > INSTALL_CULL_TILES) {
        for (const id of ids) cullInstalls.push({ id });
        session.installItems.delete(pid);
        session.installSent.delete(pid);
      }
    }
    if (cullInstalls.length) send(ws, 'leave', { installation: cullInstalls });
  }

  // Fill in installations on built parcels coming into range.
  await streamBuiltInstallations(ws, session, gx, gy);
}
