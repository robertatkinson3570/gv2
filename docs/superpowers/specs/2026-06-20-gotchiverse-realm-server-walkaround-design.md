# Gotchiverse Realm Server — Milestone 1: Walk-Around Tracer Bullet

- **Date:** 2026-06-20
- **Status:** Draft for review
- **Owner:** ratkinson701@gmail.com
- **Related:** Base migration of `gotchiverse-2d` (see `memory/gv2-base-migration-wiring.md`)

## Context

`gotchiverse-2d` is the **client only**. The playable world is server-authoritative:
the client asks a backend for a zone socket, opens a WebSocket, and renders whatever
state the server streams. That realm server is Pixelcraft's proprietary backend — it
is **not** in any public repo (verified: all 81 `aavegotchi` org repos enumerated; the
distinctive markers `spawnLocId` / `socket-transfer`+`transferKey` appear in zero public
repos). The live one (`api.gotchiverse.io/realm/socket`) returns Cloudflare 1016 (origin
offline). So "enter Gotchiverse" fails with no server to answer.

Everything visual already ships with the client: the Phaser engine, sprites, and the
world maps bundled in `public/maps/chunks/`. **Reviving the world = rebuilding the
server side of the socket contract**, starting with the smallest slice that spawns the
player in and lets them walk.

## Goal (Milestone 1)

A local server that makes **"Enter Gotchiverse" succeed**: the player spawns into the
citaadel map and can **walk around** it, rendered by the unmodified client renderer.

### Success criteria

- `yarn dev` (client) + the new server running locally.
- Connect a Base wallet, select a gotchi + parcel, click Enter.
- The gotchi sprite spawns on the citaadel map; the camera follows it.
- WASD / mouse movement moves the avatar smoothly.
- No "error connecting to the portal" toast; no fatal console errors.

### Non-goals (later milestones)

- Other players / multiplayer AOI zones, zone-to-zone transfers.
- Combat, enemies, missiles, melee, health/AP.
- Server-side collision/physics (matter-js) and world bounds enforcement.
- Real parcel/installation/tile placement from chain/subgraph (rendered static/empty here).
- On-chain actions (channel/harvest/craft), auth-token validation, reCAPTCHA validation.

## Architecture

**Approach A — standalone Node + TypeScript WebSocket server**, new `server/` folder in
this repo, using the `ws` library. It runs alongside the client and is the foundation
later milestones extend. No server-side physics yet — movement is integrated from input
on a fixed tick (see Movement Model). Rejected alternatives: embedding in Next.js API
routes (fights the framework for long-lived sockets); faking the socket in the client
(throwaway, dead-ends the revival).

```
server/
  src/
    index.ts          # boots HTTP + WS, reads config
    http/
      lookup.ts       # GET /realm/socket  -> { socketUrl, id }
      stubs.ts        # minimal 200/empty responses for pre-enter GETs (noise reduction)
    ws/
      gateway.ts      # WebSocket server; frames as JSON {channel, data}
      session.ts      # per-connection player session (id, owner, x, y, orientation, dir)
      handlers.ts     # enter / movement / ping  ->  enter / positions / pong
    world/
      tick.ts         # fixed-rate loop: integrate positions from input, broadcast
      citaadel.ts     # spawn point(s) + (later) walkable bounds
    config.ts         # port, tick rate, move speed
  package.json
  tsconfig.json
```

## Protocol contract (reverse-engineered from the client)

Envelope: every frame is `JSON.stringify({ channel, data })`. (Some live messages are
binary via `parseBinaryMessage`; the client also fully handles **JSON** `positions`, so
the server uses JSON throughout for Milestone 1.)

### 1. HTTP socket lookup — REQUIRED

`GET /realm/socket?owner=<addr>&gotchi=<id>&map=citaadel`
→ `200 { "socketUrl": "ws://localhost:<WS_PORT>", "id": <zoneId> }`
(`GameController.socketConnect` reads `socketData.socketUrl` and `socketData.id`.)

### 2. WS: client → server

- `enter` (on socket open): `getPlayerData()` + extras —
  `{ authToken, id, isSpectator, name, network, owner, collateralColor, level, version, recaptchaToken, userAgent, spawnLocId }`.
  Server ignores auth/recaptcha for M1.
- `movement` / action `keys`: `{ direction, isSprint }` (keyboard).
- `movement` / action `mouse`: `{ ...pointer/target data }`.
- `movement` / action `toggle_sprint`: `{ action }`.
- `ping` (every 5s).
- `interaction` / `socket-transfer` / `beta-admin-command`: ignored in M1.

### 3. WS: server → client

- `enter` (reply to client enter): `{ player: [PlayerSpawn] }` — spawns the avatar.
  Other arrays (`item`, `parcel`, `installation`, `tile`, `enemy`, `inventoryItem`,
  `missile`) omitted/empty in M1. `PlayerSpawn` mirrors the client `Player` type — at
  minimum `{ id, owner, name, isSpectator, collateralColor, level, x, y, orientation }`
  (exact fields pinned from `types` during planning).
- `positions` (each tick while moving): `{ player: [{ id, x, y, orientation }] }` —
  drives the avatar's on-screen movement (`Players.handlePositions`).
- `pong` (reply to ping).

## Movement model

The client sends **input** (`movement/keys {direction}`), not final positions — the world
is **server-authoritative**. So the server maintains each session's `{ x, y, orientation,
direction, sprint }`, and a fixed tick loop (~20–30 Hz) integrates `x/y += dir * speed *
dt` and broadcasts `positions`. The avatar moves only because the server echoes computed
positions back. No collision/bounds in M1 — free movement across the map.

## Required client changes (minimal)

1. **Point at the local server:** set `NEXT_PUBLIC_API_URL=http://localhost:<HTTP_PORT>`
   in `.env`.
2. **reCAPTCHA shim:** the client calls `window.grecaptcha.enterprise.ready()` before
   `enter`; if absent it throws and `enter` never sends. Ensure `gameConfig.enableRECAPTCHA`
   is `false` (skips token) **and** provide a no-op `window.grecaptcha.enterprise.{ready,
   execute}` shim for local dev (e.g. a guarded dev-only injection). Pinned during planning
   after locating where `gameConfig` / the grecaptcha script are set.

No other client/renderer changes — the goal is the stock client rendering the world.

## Data flow

```
Client                              Server
  selectGotchi+parcel, Enter
  GET /realm/socket?owner&gotchi --> lookup.ts -> { socketUrl, id }
  open WS(socketUrl) ------------->
  send {enter, data:playerData} --> handlers.enter: create session @ spawn point
                              <----- {enter, data:{player:[you]}}     (avatar spawns)
  keydown -> {movement,keys} -----> session.direction = dir
  (tick loop) <------------------- {positions, data:{player:[{x,y}]}} (avatar walks)
  ping (5s) ----------------------> 
                              <----- {pong}
```

## Error handling

- Lookup: M1 has a single zone, so `/realm/socket` always returns `200 { socketUrl, id }`
  (params are logged, not validated). Never hang — the client shows the portal toast only
  if `socketUrl` is missing, which M1 never does.
- Unknown WS channel → log + ignore (client tolerates unknown channels).
- Malformed frame → catch JSON parse, log, drop the frame; never crash the connection.
- Disconnect → drop the session; (reconnect/transfer handled in later milestones).

## Testing / verification

- **Protocol smoke test (no browser):** a Node script that GETs `/realm/socket`, opens the
  WS, sends `enter`, asserts an `enter` reply with a `player`, sends `movement/keys`,
  asserts `positions` frames with changing `x/y`, sends `ping`, asserts `pong`.
- **End-to-end (browser, the real proof):** run client + server, connect wallet on Base,
  Enter, confirm the gotchi spawns and walks via Playwright screenshot + console (0 fatal
  errors). This is the milestone's definition of done.

## Risks & open questions

- **Exact `PlayerSpawn` / `PositionEvent` field set** — pin from `types` (`Player`,
  `PositionEvent`, `SelectedPlayer`) so `addPlayers` doesn't choke on a missing field.
- **gameConfig / grecaptcha location** — confirm where `enableRECAPTCHA` defaults and where
  the recaptcha script loads, to place the shim correctly.
- **Pre-enter HTTP calls** — the client hits several GETs (`/realm/parcel/info`,
  `/realm/gotchi/status`, `/user/*`, `/realm/item-store/available`, …). None appear to
  block `enter`, but stub the noisy ones (empty `200`) to keep the console clean; enumerate
  during planning.
- **Spawn coordinates** — choose a known-walkable citaadel coordinate (from a
  `public/maps/chunks/*.json` tile) as the M1 spawn.

## Milestone roadmap (context, not part of M1)

1. **Walk-around (this spec)** — spawn + move on the static citaadel.
2. **Your real world (read-only)** — render your Base parcels/installations/tiles from the
   `gotchiverse-base` subgraph; server-side bounds/collision via matter-js.
3. **Interactive** — channel/harvest/craft using Base empty-`0x` signatures (gotchi-closet
   ABIs); item/alchemica pickup.
4. **Multiplayer** — AOI zones, multiple players, zone transfers, chat.
