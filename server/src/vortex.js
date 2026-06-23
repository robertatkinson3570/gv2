// Vortex (deposit station) proximity. The citaadel has fixed "deposite" stations
// (a.k.a. Vortices) where a player banks their gathered pocket alchemica. The
// client already renders the "press to open" prompt + glow the moment the server
// tells it the player is near one (Alchemicas.ts 'withdraw' message) -- it just
// needs the server to DETECT proximity and emit, which it never did. depositId is
// an index into the SAME flattened deposit list the client builds, so both sides
// must flatten identically and WITHOUT filtering (filtering would desync indices).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { TILE_SIZE } from './config.js';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEPOSITS_PATH = join(HERE, '../../shared_code/data/maps/citaadel/collisions/deposites.json');

// Client: `_.flattenDeep(_.values(depositsJson))`. Object.values preserves key
// insertion order and .flat(Infinity) matches flattenDeep over the nested arrays,
// so indices line up 1:1. Do NOT filter -- a dropped entry would shift every
// later depositId and the client would open the wrong (or no) station.
let DEPOSITS = [];
try {
  const json = JSON.parse(readFileSync(DEPOSITS_PATH, 'utf8'));
  DEPOSITS = Object.values(json).flat(Infinity);
  console.log(`[vortex] loaded ${DEPOSITS.length} deposit stations`);
} catch (e) {
  console.warn('[vortex] could not load deposites.json:', e.message);
}

// Trigger radius around a station center, in px. A station footprint is ~4x3 tiles
// (~160px half-diagonal), so 180px shows the prompt when the player is standing on
// or right next to it -- matching the original "walk up to the vortex" feel.
const VORTEX_RADIUS = 180;
const VORTEX_RADIUS_SQ = VORTEX_RADIUS * VORTEX_RADIUS;

// Pixel centers, computed once. Entries without a position stay null so indices
// (== client depositId) are preserved while being skipped in the distance check.
const CENTERS = DEPOSITS.map((d) =>
  d && d.position
    ? {
        x: (d.position.x + (d.dimensions?.width || 0) / 2) * TILE_SIZE,
        y: (d.position.y + (d.dimensions?.height || 0) / 2) * TILE_SIZE,
      }
    : null,
);

/** Index of the nearest deposit station within range of (x,y) in px, or -1. */
export function nearestVortex(x, y) {
  let best = -1;
  let bestD = VORTEX_RADIUS_SQ;
  for (let i = 0; i < CENTERS.length; i++) {
    const c = CENTERS[i];
    if (!c) continue;
    const dx = x - c.x;
    const dy = y - c.y;
    const d2 = dx * dx + dy * dy;
    if (d2 <= bestD) {
      bestD = d2;
      best = i;
    }
  }
  return best;
}

export function vortexCount() {
  return DEPOSITS.length;
}
