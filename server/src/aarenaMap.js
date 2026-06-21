// Aarena wall collisions. The arena is a static 128x128-tile map with no parcels
// or installations, so its walls come from the client's collision data
// (shared_code/data/maps/aarena/collisions/blocks.json — wall rectangles in tile
// units) rather than from on-chain installation footprints like the citaadel.
// world.js consults isAarenaBlocked() when moving an aarena session.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const BLOCKS_PATH = join(HERE, '../../shared_code/data/maps/aarena/collisions/blocks.json');

// 128 tiles square (chunkWidth * chunksHorizontal from public/maps/aarena/master.json).
export const AARENA_TILES = 128;

// Expand each wall rectangle into the set of tiles it covers, keyed "tx,ty".
const blocked = new Set();
try {
  const blocks = JSON.parse(readFileSync(BLOCKS_PATH, 'utf8'));
  for (const b of blocks) {
    const { x, y } = b.position || {};
    const { width, height } = b.dimensions || {};
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    for (let i = 0; i < (width || 0); i++) {
      for (let j = 0; j < (height || 0); j++) blocked.add(`${x + i},${y + j}`);
    }
  }
  console.log(`[aarena] loaded ${blocked.size} blocked tiles from ${blocks.length} wall rects`);
} catch (e) {
  console.warn('[aarena] could not load wall collisions:', e.message);
}

/** True if tile (tx,ty) is a wall or outside the finite arena bounds. */
export function isAarenaBlocked(tx, ty) {
  if (tx < 0 || ty < 0 || tx >= AARENA_TILES || ty >= AARENA_TILES) return true;
  return blocked.has(`${tx},${ty}`);
}
