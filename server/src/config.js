// Milestone 1 (walk-around) realm server config.
// All values are local-dev defaults; override via env vars if needed.

export const PORT = Number(process.env.PORT) || 8080;

// Public URL the HTTP /realm/socket lookup hands back to the client. HTTP and
// WS share one port (ws is attached to the http server's upgrade), so this is
// the same host:port as the lookup, with ws:// scheme.
export const PUBLIC_WS_URL = process.env.PUBLIC_WS_URL || `ws://localhost:${PORT}`;

// Single zone id for M1 (no AOI zones / transfers yet).
export const ZONE_ID = 'citaadel-0';

// #5 Combat lives in the aarena, not the citaadel. Single env switch: with it
// off there are no enemies anywhere (and the landing "Join Aarena" button stays
// "COMING SOON"); with it on the aarena becomes a live Lickquidator combat zone
// while the citaadel stays peaceful. Centralized here so the http config
// endpoint, gateway, and game actions all read one source of truth.
export const COMBAT_ENABLED = process.env.COMBAT_ENABLED === 'true';

// The aarena is a dedicated finite map (client public/maps/aarena: 128 tiles *
// TILE_SIZE = 8192px square), entered via the landing "Join Aarena" button
// (enter payload carries map='aarena', no parcel spawnLocId). Players spawn at
// the arena's combat center — the client's COMBAT_TESTING_SPAWN_AREA for aarena
// (const.game.ts) — and never stream citaadel parcels.
export const AARENA_ZONE_ID = 'aarena-0';
export const AARENA_SPAWN = { x: 4096, y: 4096 };
// Spread concurrent arena spawns so avatars don't stack, while staying near center.
export const AARENA_SPAWN_JITTER = 600;
// Spawn protection: on entering the arena and on every respawn, the player takes
// no enemy damage for this long and no new Lickquidators spawn right on top of
// them. Without it you spawn into the swarm, die in seconds, auto-respawn into
// the same swarm, and the "REKT" death screen loops.
export const AARENA_SPAWN_GRACE_MS = 4000;

// Simulation tick. The client tweens between position updates, so ~30 Hz feels
// smooth. Movement integrates per tick.
export const TICK_HZ = 30;
export const TICK_MS = Math.round(1000 / TICK_HZ);

// Gotchi movement. From the client's GAME_CONFIG (citaadel): GOTCHI_SPEED 14 px
// per game loop, SPRINT_FACTOR 2. We apply per tick.
export const GOTCHI_SPEED = 14;
export const SPRINT_FACTOR = 2;

// Citaadel spawn. COMBAT_TESTING_SPAWN_AREA from the client map config — a known
// valid in-map coordinate (mid-map, outside every NO_SPAWN_ZONE). Chunks load
// around the player via AOI, so any valid coord works.
export const SPAWN = { x: 396900, y: 171700 };

// Spread concurrent spawns a little so avatars don't stack exactly.
export const SPAWN_JITTER = 400;

// Map tile size in px (client TILE_SIZE). Parcel grid coords -> pixels: coord * TILE_SIZE.
export const TILE_SIZE = 64;

// Goldsky gotchiverse-base subgraph — parcels/installations/tiles on Base.
export const GOTCHIVERSE_SUBGRAPH =
  process.env.GOTCHIVERSE_SUBGRAPH ||
  'https://api.goldsky.com/api/public/project_cmh3flagm0001r4p25foufjtt/subgraphs/gotchiverse-base/prod/gn';

// Base RPC + realm diamond — for reading on-chain installation grid positions.
// publicnode handles concurrent large grid reads (uint256[32][64] ≈ 64KB)
// reliably; mainnet.base.org is faster but drops ~3/8 concurrent calls.
export const BASE_RPC = process.env.BASE_RPC || 'https://base-rpc.publicnode.com';
export const REALM_DIAMOND = '0x4B0040c3646D3c44B8a28Ad7055cfCF536c05372';
