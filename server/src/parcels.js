// M2: fetch a player's real parcels from the gotchiverse-base subgraph so the
// server can render their land and spawn them on it. The client derives a
// parcel's on-map position from its `parcelId` ("C-<x>-<y>-<size>"), so we pass
// the parcelId through as the ParcelEvent `id` and also return pixel coords for
// choosing a spawn point.

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { GOTCHIVERSE_SUBGRAPH, TILE_SIZE } from './config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// The client renders every parcel id it's sent and derives the on-map position
// from the id itself ("C-<x>-<y>-<size>"), so to show the whole Gotchiverse we
// stream the full static parcel list the client already ships with.
let _allParcelIds = null;
export function loadAllParcelIds() {
  if (_allParcelIds) return _allParcelIds;
  try {
    const path = join(__dirname, '../../shared_code/data/parcels.json');
    const parcels = JSON.parse(readFileSync(path, 'utf8'));
    _allParcelIds = parcels.map((p) => p.parcelId).filter(Boolean);
    console.log(`[parcels] loaded ${_allParcelIds.length} parcel ids (full map)`);
  } catch (e) {
    console.warn('[parcels] could not load full parcel list:', e.message);
    _allParcelIds = [];
  }
  return _allParcelIds;
}

// Same full list, parsed into grid coords (parsed from the id "C-<x>-<y>-..."),
// so the server can pick the parcels near a player without a subgraph call —
// used to stream a large-but-bounded region (rendering all 55k at once lags).
let _allParcels = null;
export function loadAllParcels() {
  if (_allParcels) return _allParcels;
  _allParcels = loadAllParcelIds()
    .map((id) => {
      const parts = id.split('-');
      return { id, gx: Number(parts[1]), gy: Number(parts[2]) };
    })
    .filter((p) => Number.isFinite(p.gx) && Number.isFinite(p.gy));
  return _allParcels;
}

// Parcel footprint index for road detection: a gotchi is "on a road" when its
// tile is in the gaps BETWEEN parcels (not inside any parcel). Dimensions come
// from the parcelId suffix (H humble, R reasonable, V spacious-vertical,
// U spacious-horizontal); the grid getters confirm the tile sizes.
const PARCEL_DIMS = { H: [8, 8], R: [16, 16], V: [32, 64], U: [64, 32] };
const FP_BUCKET = 64; // tiles
let _footprintIndex = null;
function loadFootprintIndex() {
  if (_footprintIndex) return _footprintIndex;
  _footprintIndex = new Map(); // "bx,by" -> [{ x, y, w, h }]
  for (const p of loadAllParcels()) {
    const [w, h] = PARCEL_DIMS[p.id.split('-').pop()] || [16, 16];
    const fp = { x: p.gx, y: p.gy, w, h };
    for (let bx = Math.floor(p.gx / FP_BUCKET); bx <= Math.floor((p.gx + w) / FP_BUCKET); bx++) {
      for (let by = Math.floor(p.gy / FP_BUCKET); by <= Math.floor((p.gy + h) / FP_BUCKET); by++) {
        const k = `${bx},${by}`;
        if (!_footprintIndex.has(k)) _footprintIndex.set(k, []);
        _footprintIndex.get(k).push(fp);
      }
    }
  }
  console.log(`[parcels] footprint index built (${_footprintIndex.size} buckets)`);
  return _footprintIndex;
}

/** True if (tileX,tileY) is on a road (in the gap between parcels, not on one). */
export function onRoad(tileX, tileY) {
  const bucket = loadFootprintIndex().get(`${Math.floor(tileX / FP_BUCKET)},${Math.floor(tileY / FP_BUCKET)}`);
  if (!bucket) return true;
  for (const fp of bucket) {
    if (tileX >= fp.x && tileX < fp.x + fp.w && tileY >= fp.y && tileY < fp.y + fp.h) return false;
  }
  return true;
}

/**
 * Parcels in a coordinate window around (gridX, gridY) that actually have
 * installations built on them (owned by anyone), so the server can grid-read
 * and render their buildings — not just the player's own land. Uses the
 * subgraph's equippedInstallations to skip the (many) empty parcels.
 * @returns {Promise<Array<{ id:string, tokenId:string, size:number, gridX:number, gridY:number }>>}
 */
// Cache built-parcel lookups by a coarse region bucket so a player roaming the
// same area doesn't re-query the subgraph each AOI refresh.
const _builtCache = new Map(); // "bx_by" -> { parcels, ts }
const BUILT_BUCKET = 150; // tiles — small so the cache can't serve a far cluster
const BUILT_CACHE_TTL_MS = Number(process.env.BUILT_CACHE_TTL_MS) || 10 * 60 * 1000;

// Tight default window: a large window + `first:1000` is truncated by the
// subgraph to the wrong geographic cluster, missing the spawn's real neighbours.
export async function fetchNearbyBuiltParcels(gridX, gridY, radius = 300) {
  if (!Number.isFinite(gridX) || !Number.isFinite(gridY)) return [];
  const bkey = `${Math.round(gridX / BUILT_BUCKET)}_${Math.round(gridY / BUILT_BUCKET)}`;
  const hit = _builtCache.get(bkey);
  if (hit && Date.now() - hit.ts < BUILT_CACHE_TTL_MS) return hit.parcels;
  const query = `{ parcels(first: 1000, where: { coordinateX_gte: ${gridX - radius}, coordinateX_lte: ${gridX + radius}, coordinateY_gte: ${gridY - radius}, coordinateY_lte: ${gridY + radius} }) { id parcelId coordinateX coordinateY size equippedInstallations(first: 1) { id } equippedTiles(first: 1) { id } } }`;
  try {
    const res = await fetch(GOTCHIVERSE_SUBGRAPH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    const parcels = (json?.data?.parcels || [])
      .filter((p) => p.parcelId && ((p.equippedInstallations && p.equippedInstallations.length) || (p.equippedTiles && p.equippedTiles.length)))
      .map((p) => ({
        id: p.parcelId,
        tokenId: p.id,
        size: Number(p.size),
        gridX: Number(p.coordinateX),
        gridY: Number(p.coordinateY),
        tiled: !!(p.equippedTiles && p.equippedTiles.length),
      }));
    // Only cache non-empty results — caching an empty (e.g. a transient subgraph
    // hiccup) would hide installations across a whole region until the TTL expires.
    if (parcels.length) _builtCache.set(bkey, { parcels, ts: Date.now() });
    return parcels;
  } catch (e) {
    console.warn('[parcels] nearby built fetch failed:', e.message);
    return hit ? hit.parcels : [];
  }
}

/**
 * @param {string} owner wallet address
 * @returns {Promise<Array<{ id: string, x: number, y: number }>>}
 */
export async function fetchOwnerParcels(owner) {
  if (!owner) return [];
  const addr = String(owner).toLowerCase();
  const query = `{ parcels(first: 200, where: { owner: "${addr}" }) { id parcelId coordinateX coordinateY size } }`;
  try {
    const res = await fetch(GOTCHIVERSE_SUBGRAPH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    const parcels = json?.data?.parcels || [];
    return parcels
      .filter((p) => p.parcelId)
      .map((p) => ({
        id: p.parcelId, // coordinate id the client renders / derives position from
        tokenId: p.id, // numeric token id for on-chain grid reads
        size: Number(p.size),
        gridX: Number(p.coordinateX),
        gridY: Number(p.coordinateY),
        x: Number(p.coordinateX) * TILE_SIZE,
        y: Number(p.coordinateY) * TILE_SIZE,
      }));
  } catch (e) {
    console.warn('[parcels] subgraph fetch failed:', e.message);
    return [];
  }
}

/**
 * Fetch parcels in a coordinate window around (gridX, gridY) so the neighborhood
 * around the player renders, not just their own land. Grid units (coordinateX/Y).
 * @returns {Promise<Array<{ id: string, gridX: number, gridY: number, x: number, y: number }>>}
 */
export async function fetchNearbyParcels(gridX, gridY, radius = 1200) {
  if (!Number.isFinite(gridX) || !Number.isFinite(gridY)) return [];
  const query = `{ parcels(first: 250, where: { coordinateX_gte: ${gridX - radius}, coordinateX_lte: ${gridX + radius}, coordinateY_gte: ${gridY - radius}, coordinateY_lte: ${gridY + radius} }) { parcelId coordinateX coordinateY } }`;
  try {
    const res = await fetch(GOTCHIVERSE_SUBGRAPH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const json = await res.json();
    return (json?.data?.parcels || [])
      .filter((p) => p.parcelId)
      .map((p) => ({
        id: p.parcelId,
        gridX: Number(p.coordinateX),
        gridY: Number(p.coordinateY),
        x: Number(p.coordinateX) * TILE_SIZE,
        y: Number(p.coordinateY) * TILE_SIZE,
      }));
  } catch (e) {
    console.warn('[parcels] nearby fetch failed:', e.message);
    return [];
  }
}
