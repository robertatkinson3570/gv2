// Server-authoritative alchemica gathering: a shared pool of ground items that
// players walk over to collect into their gotchi's carried balance.
// Type index matches the client/contract order: FUD=0, FOMO=1, ALPHA=2, KEK=3.
//
// All in-memory (no RPC/subgraph), so gathering adds zero external server load.

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { TILE_SIZE } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Installation type metadata: itemId -> { installationType, alchemicaType, harvestRate }.
// Harvesters are installationType 1 and produce their alchemicaType at harvestRate/hr.
let _installTypes = {};
try {
  _installTypes = JSON.parse(readFileSync(join(__dirname, '../../shared_code/data/installations.json'), 'utf8'));
} catch {
  /* metadata optional — falls back to no production */
}

const TYPES = ['fud', 'fomo', 'alpha', 'kek'];
const items = new Map(); // id -> { id, x, y, type, label, quantity }
let _seq = 0;

const rnd = (n) => Math.floor(Math.random() * n);

// Built parcels that produce alchemica (have harvesters). parcelId -> { cx, cy, rates[4] }.
const producers = new Map();

/** Scatter `count` alchemica chunks (pixel coords) around (cx,cy). Returns the new items. */
export function spawnAround(cx, cy, count, spread = 1400) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const type = rnd(4);
    const item = {
      id: `alch-${++_seq}`,
      x: Math.round(cx + rnd(spread * 2) - spread),
      y: Math.round(cy + rnd(spread * 2) - spread),
      type,
      label: TYPES[type],
      quantity: 1 + rnd(60),
    };
    items.set(item.id, item);
    out.push(item);
  }
  return out;
}

/** Spawn a single alchemica chunk at (x,y). */
function spawnOne(x, y, type, quantity) {
  const item = { id: `alch-${++_seq}`, x: Math.round(x), y: Math.round(y), type, label: TYPES[type], quantity: Math.max(1, quantity) };
  items.set(item.id, item);
  return item;
}

/** Drop alchemica on the ground as a real, collectable item (token-drop action). */
export function dropAlchemica(x, y, type, quantity) {
  return spawnOne(x, y, type, quantity);
}

/**
 * Register a built parcel as an alchemica producer from its installation ids.
 * Harvesters (installationType 1) produce their alchemicaType at harvestRate.
 * @param {string[]} installationIds ids like "parcelId_itemId_x_y_flag_state"
 */
export function registerParcelProducers(parcelId, gridX, gridY, installationIds) {
  if (producers.has(parcelId)) return;
  const rates = [0, 0, 0, 0];
  for (const id of installationIds) {
    const itemId = String(id).split('_')[1];
    const meta = _installTypes[itemId];
    if (meta && meta.harvestRate > 0) rates[meta.alchemicaType] += meta.harvestRate;
  }
  if (!rates.some((r) => r > 0)) return;
  producers.set(parcelId, { cx: gridX * TILE_SIZE + 160, cy: gridY * TILE_SIZE + 160, rates });
}

const PRODUCE_MAX = 2500; // global cap on ground items
/** Producers within `radius` px of (x,y) spawn alchemica of their types. Returns new items. */
export function produceNear(x, y, radius) {
  if (items.size >= PRODUCE_MAX) return [];
  const r2 = radius * radius;
  const out = [];
  for (const p of producers.values()) {
    const dx = p.cx - x;
    const dy = p.cy - y;
    if (dx * dx + dy * dy > r2) continue;
    for (let type = 0; type < 4; type++) {
      const rate = p.rates[type];
      if (rate <= 0) continue;
      // Higher-rate (higher-level) harvesters spawn more often + bigger chunks.
      if (Math.random() < Math.min(0.85, rate / 120)) {
        out.push(spawnOne(p.cx + rnd(320) - 160, p.cy + rnd(320) - 160, type, 1 + Math.round(rate / 6)));
      }
    }
  }
  return out;
}

export function producerCount() {
  return producers.size;
}

/** Items within `radius` px of (x,y) — for AOI streaming. */
export function itemsNear(x, y, radius) {
  const r2 = radius * radius;
  const out = [];
  for (const it of items.values()) {
    const dx = it.x - x;
    const dy = it.y - y;
    if (dx * dx + dy * dy <= r2) out.push(it);
  }
  return out;
}

/** Remove + return items within pickup range of (x,y) (server-authoritative pickup). */
const PICKUP_RANGE = 128; // px (~2 tiles)
export function collectAt(x, y) {
  const r2 = PICKUP_RANGE * PICKUP_RANGE;
  const got = [];
  for (const it of items.values()) {
    const dx = it.x - x;
    const dy = it.y - y;
    if (dx * dx + dy * dy <= r2) {
      got.push(it);
      items.delete(it.id);
    }
  }
  return got;
}

export function totalItems() {
  return items.size;
}
