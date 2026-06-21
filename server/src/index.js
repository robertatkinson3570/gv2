// Boot the Milestone 1 realm server: HTTP (/realm/socket + stubs) and a WebSocket
// server sharing one port, plus the world tick loop that integrates movement and
// broadcasts positions.

import { WebSocketServer } from 'ws';
import { createHttpServer } from './httpServer.js';
import { handleMessage, handleClose, broadcast, updateAoi, collectAlchemica, streamAlchemica, streamEnemies, send, damageArenaPlayer, COMBAT_ENABLED } from './gateway.js';
import { produceNear } from './alchemica.js';
import { spawnEnemies, enemiesNear, combatTick, enemyCount } from './combat.js';
import { tick, forEachSession } from './world.js';
import { PORT, PUBLIC_WS_URL, TICK_MS, TICK_HZ } from './config.js';

const httpServer = createHttpServer();
// Security: cap inbound WS frame size. The protocol's largest legit frame is a
// small JSON envelope; ws defaults to 100 MiB, which let a client push 1 MB+
// names / multi-MB frames as a memory-pressure vector. 64 KB is generous.
const wss = new WebSocketServer({ server: httpServer, maxPayload: 64 * 1024 });

wss.on('connection', (ws) => {
  console.log('[ws] connection opened');
  ws.on('message', (raw) => handleMessage(ws, raw));
  ws.on('close', () => handleClose(ws));
  ws.on('error', (err) => console.warn('[ws] socket error:', err.message));
});

// World loop: advance movement, broadcast positions of anyone who moved.
setInterval(() => {
  const events = tick();
  if (events.length) broadcast(wss, 'positions', { player: events });
}, TICK_MS);

// AOI loop: prefetch parcels/installations ahead of sessions that have roamed
// far enough, and cull what's behind. 1s cadence keeps streaming responsive.
setInterval(() => {
  forEachSession((ws, session) => {
    void updateAoi(ws, session);
  });
}, 1000);

// Pickup loop: collect ground alchemica players are standing on (server-authoritative).
setInterval(() => {
  forEachSession((ws, session) => collectAlchemica(ws, session));
}, 200);

// Alchemica loop: harvesters on built parcels near players produce ground alchemica
// (every ~8s), and nearby items are streamed to each player (every ~1.5s).
const PRODUCE_RADIUS = 2400; // px
let _produceAccum = 0;
setInterval(() => {
  _produceAccum += 1500;
  const doProduce = _produceAccum >= 8000;
  if (doProduce) _produceAccum = 0;
  forEachSession((ws, session) => {
    if (doProduce) produceNear(session.x, session.y, PRODUCE_RADIUS);
    streamAlchemica(ws, session);
  });
}, 1500);

// #5 Combat loop (aarena zone) — only when COMBAT_ENABLED. Spawns Lickquidators
// near players, runs their AI, applies attacks (player health/death/respawn),
// regenerates AP, and streams enemies. ~8Hz.
if (COMBAT_ENABLED) {
  let _apAccum = 0;
  setInterval(() => {
    const now = Date.now();
    // Combat belongs to the aarena only — the citaadel stays peaceful. Build the
    // combat roster from arena sessions; enemies spawn near and target only them.
    const players = [];
    forEachSession((ws, session) => {
      if ((session.map || 'citaadel') === 'aarena') {
        players.push({ ws, session, id: session.id, x: session.x, y: session.y, isDead: !!session.isDead });
      }
    });
    if (!players.length) return;
    // Spawn Lickquidators near arena players where the area is sparse.
    for (const p of players) {
      // Lickquidators spawn and close in immediately so the arena is never empty.
      // Spawn protection (in the attack loop below) only makes the player
      // damage-immune for the grace window; it does NOT hide the enemies.
      if (!p.isDead && enemyCount() < 250 && enemiesNear(p.x, p.y, 1600).length < 8) spawnEnemies(p.x, p.y, 5, 1100);
    }
    // Enemy AI -> moves + attacks. Stream moves to arena players only (citaadel
    // clients never received the enemies, so must not get their position frames).
    const { moves, attacks } = combatTick(players, now);
    if (moves.length) for (const p of players) send(p.ws, 'positions', { enemy: moves });
    for (const atk of attacks) {
      const t = players.find((p) => p.id === atk.playerId);
      // Lickquidator hit -> shared damage path (spawn protection, death, protected respawn).
      if (t) damageArenaPlayer(t.ws, t.session, atk.dmg, 'Lickquidator');
    }
    // AP regen (~1s) + enemy streaming, arena players only.
    _apAccum += 120;
    const regen = _apAccum >= 1000;
    if (regen) _apAccum = 0;
    for (const p of players) {
      streamEnemies(p.ws, p.session);
      if (regen && !p.session.isDead) {
        p.session.ap = Math.min(p.session.maxAP ?? 50, (p.session.ap ?? 50) + 2);
        send(p.ws, 'ap-changed', { id: p.id, ap: p.session.ap, type: 'player' });
      }
    }
  }, 120);
}

httpServer.listen(PORT, () => {
  console.log(`Gotchiverse realm server (M1 walk-around)`);
  console.log(`  HTTP   : http://localhost:${PORT}  (GET /realm/socket)`);
  console.log(`  WS     : ${PUBLIC_WS_URL}`);
  console.log(`  tick   : ${TICK_HZ} Hz`);
});
