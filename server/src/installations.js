// Read on-chain installation positions from the Base realm diamond's grid getters
// and turn them into the composite installation ids the client renders.
//
// Each grid getter returns uint256[rows][cols] where every occupied tile holds
// the installationId. An installation's footprint repeats its id across its
// width/height, so the START tile (top-left) is the one whose id differs from the
// cell above and to the left. The client id format is:
//   parcelId_itemId_x_y_typeFlag_state   (x = outer/grid index, y = inner)

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ethers } from 'ethers';
import { BASE_RPC, REALM_DIAMOND } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Installation type metadata (footprint width/height for collision).
let _installMeta = {};
try {
  _installMeta = JSON.parse(readFileSync(join(__dirname, '../../shared_code/data/installations.json'), 'utf8'));
} catch {
  /* optional */
}

// World tiles occupied by installations, so the server (which is authoritative
// over movement) can block the gotchi from walking through buildings.
const blockedTiles = new Set(); // "tileX,tileY"
export function isBlocked(tileX, tileY) {
  return blockedTiles.has(`${tileX},${tileY}`);
}
/** Record an installation's full footprint (top-left + width/height) as blocked. */
function recordFootprints(parcelId, installs) {
  const parts = String(parcelId).split('-');
  const px = Number(parts[1]);
  const py = Number(parts[2]);
  if (!Number.isFinite(px) || !Number.isFinite(py)) return;
  for (const it of installs) {
    const s = String(it.id).split('_');
    const x = Number(s[2]);
    const y = Number(s[3]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    const meta = _installMeta[s[1]];
    const w = (meta && Number(meta.width)) || 1;
    const h = (meta && Number(meta.height)) || 1;
    for (let dx = 0; dx < w; dx++) {
      for (let dy = 0; dy < h; dy++) blockedTiles.add(`${px + x + dx},${py + y + dy}`);
    }
  }
}

/** True if an installation id refers to an NFT-display installation (type 5). */
export function isNftDisplay(installationId) {
  const meta = _installMeta[String(installationId).split('_')[1]];
  return !!meta && Number(meta.installationType) === 5;
}

const GRID = {
  humble: { fn: 'getHumbleGrid', rows: 8, cols: 8 },
  reasonable: { fn: 'getReasonableGrid', rows: 16, cols: 16 },
  spaciousV: { fn: 'getSpaciousVerticalGrid', rows: 32, cols: 64 },
  spaciousH: { fn: 'getSpaciousHorizontalGrid', rows: 64, cols: 32 },
};

// Pick the grid getter. Size 0/1 are humble/reasonable; size >= 2 is spacious,
// whose orientation comes from the parcelId suffix ("C-x-y-V" vertical, else
// horizontal) rather than the size number.
function gridFor(parcel) {
  const size = Number(parcel.size);
  if (size <= 0) return GRID.humble;
  if (size === 1) return GRID.reasonable;
  const suffix = String(parcel.id || '').split('-').pop();
  return suffix === 'V' ? GRID.spaciousV : GRID.spaciousH;
}

// Public Base RPC intermittently returns empty ("missing revert data") under a
// burst of calls; retry a couple of times before giving up.
async function readGrid(fn, tokenId) {
  let lastErr;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await realm[fn](BigInt(tokenId), 0n);
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
    }
  }
  throw lastErr;
}

const ABI = [
  'function getHumbleGrid(uint256,uint256) view returns (uint256[8][8])',
  'function getReasonableGrid(uint256,uint256) view returns (uint256[16][16])',
  'function getSpaciousVerticalGrid(uint256,uint256) view returns (uint256[32][64])',
  'function getSpaciousHorizontalGrid(uint256,uint256) view returns (uint256[64][32])',
];

// Pin to Base (8453) so the provider skips network auto-detection (which can be
// slow or fail on startup) and is ready for the first grid read.
const provider = new ethers.JsonRpcProvider(BASE_RPC, 8453, { staticNetwork: true });
const realm = new ethers.Contract(REALM_DIAMOND, ABI, provider);

// Persisted installation cache so a parcel's grid is read from chain at most
// once per TTL (and reused across sessions + restarts) — keeps us from pounding
// the RPC as players roam the same areas. Keyed by tokenId -> { installs, ts }.
const CACHE_PATH = join(__dirname, '../.cache/installations.json');
const CACHE_TTL_MS = Number(process.env.INSTALL_CACHE_TTL_MS) || 60 * 60 * 1000; // 1h
const _cache = new Map();
try {
  const raw = JSON.parse(readFileSync(CACHE_PATH, 'utf8'));
  for (const [k, v] of Object.entries(raw)) _cache.set(k, v);
  console.log(`[install] cache loaded: ${_cache.size} parcels`);
} catch {
  /* no cache yet */
}

let _saveTimer = null;
function saveCacheSoon() {
  if (_saveTimer) return;
  _saveTimer = setTimeout(() => {
    _saveTimer = null;
    try {
      mkdirSync(dirname(CACHE_PATH), { recursive: true });
      writeFileSync(CACHE_PATH, JSON.stringify(Object.fromEntries(_cache)));
    } catch (e) {
      console.warn('[install] cache save failed:', e.message);
    }
  }, 5000);
}

/** Read one parcel's grid (gridType 0 = installations) -> [{ id }] composite ids. */
async function readParcelInstallations(parcel) {
  const key = String(parcel.tokenId);
  const cached = _cache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) return cached.installs;

  const cfg = gridFor(parcel);
  let grid;
  try {
    grid = await readGrid(cfg.fn, parcel.tokenId);
  } catch (e) {
    console.warn(`[install] grid read failed for parcel ${parcel.tokenId} (${cfg.fn}):`, e.shortMessage || e.message);
    return cached ? cached.installs : []; // serve stale on failure if we have it
  }
  // Iterate the ACTUAL returned dimensions. Solidity `uint256[A][B]` decodes to a
  // JS array of length B (each a length-A row), so the spacious grids come back
  // transposed vs cfg.rows/cols — using the hardcoded dims read past the end and
  // threw, making EVERY spacious parcel (size 2 & 3) return 0 installations.
  const rows = Array.isArray(grid) ? grid.length : 0;
  const cols = rows && Array.isArray(grid[0]) ? grid[0].length : 0;
  const at = (r, c) => (r < 0 || c < 0 || r >= rows || c >= cols ? 0n : grid[r][c]);
  const out = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = grid[r][c];
      if (!v || v === 0n) continue;
      // top-left of the footprint only (skip repeated tiles)
      if (at(r - 1, c) === v || at(r, c - 1) === v) continue;
      // Client builds ids as `parcelId_itemId_x_y` with x = inner (column) index
      // and y = outer (row) index (it loops grid[y][x]). We loop grid[r][c] with
      // r = outer, c = inner, so x = c, y = r — emit them in that order, else the
      // installations render transposed.
      out.push({ id: `${parcel.id}_${v.toString()}_${c}_${r}_0_0` });
    }
  }
  _cache.set(key, { installs: out, ts: Date.now() });
  saveCacheSoon();
  return out;
}

/**
 * Read installations for a set of parcels in parallel.
 * @param {Array<{ id:string, tokenId:string, size:number }>} parcels
 * @returns {Promise<Array<{ id: string }>>}
 */
export async function fetchParcelInstallations(parcels) {
  // Small batches: concurrent enough to be fast, small enough that the public
  // Base RPC doesn't rate-limit the burst (readGrid retries handle the rest).
  const list = parcels || [];
  const BATCH = 8;
  const out = [];
  for (let i = 0; i < list.length; i += BATCH) {
    const batch = list.slice(i, i + BATCH);
    const results = await Promise.all(batch.map((p) => readParcelInstallations(p).catch(() => [])));
    for (let j = 0; j < results.length; j++) {
      recordFootprints(batch[j].id, results[j]); // collision: block these tiles
      out.push(...results[j]);
    }
  }
  return out;
}

// --- Floor tiles (gridType 1) — a separate grid from installations. Tiles are
// walkable (no collision/footprint). The client renders them via `enter`/`tile`
// using the same id format with the type flag set to 1.
const _tileCache = new Map(); // tokenId -> { tiles, ts }
async function readParcelTiles(parcel) {
  const key = String(parcel.tokenId);
  const cached = _tileCache.get(key);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) return cached.tiles;
  const cfg = gridFor(parcel);
  let grid;
  try {
    grid = await realm[cfg.fn](BigInt(parcel.tokenId), 1n); // gridType 1 = tiles
  } catch (e) {
    return cached ? cached.tiles : [];
  }
  const rows = Array.isArray(grid) ? grid.length : 0;
  const cols = rows && Array.isArray(grid[0]) ? grid[0].length : 0;
  const at = (r, c) => (r < 0 || c < 0 || r >= rows || c >= cols ? 0n : grid[r][c]);
  const out = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const v = grid[r][c];
      if (!v || v === 0n) continue;
      if (at(r - 1, c) === v || at(r, c - 1) === v) continue;
      out.push({ id: `${parcel.id}_${v.toString()}_${c}_${r}_1_0` }); // type flag 1 = tile
    }
  }
  _tileCache.set(key, { tiles: out, ts: Date.now() });
  return out;
}

/** Read floor tiles for a set of parcels (gridType 1). */
export async function fetchParcelTiles(parcels) {
  const list = parcels || [];
  const BATCH = 8;
  const out = [];
  for (let i = 0; i < list.length; i += BATCH) {
    const results = await Promise.all(list.slice(i, i + BATCH).map((p) => readParcelTiles(p).catch(() => [])));
    for (const r of results) out.push(...r);
  }
  return out;
}
