// Milestone 1 (walk-around) realm server config.
// All values are local-dev defaults; override via env vars if needed.

export const PORT = Number(process.env.PORT) || 8080;

// Public URL the HTTP /realm/socket lookup hands back to the client. HTTP and
// WS share one port (ws is attached to the http server's upgrade), so this is
// the same host:port as the lookup, with ws:// scheme.
export const PUBLIC_WS_URL = process.env.PUBLIC_WS_URL || `ws://localhost:${PORT}`;

// Single zone id for M1 (no AOI zones / transfers yet).
export const ZONE_ID = 'citaadel-0';

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
