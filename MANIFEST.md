# GotchiCloset / Aavegotchi — Rebuild Manifest

**Purpose:** everything needed to rebuild GotchiCloset's data layer if the official
Aavegotchi subgraph goes down. This folder (`C:\Cursor\gv2`, pushed to the private repo
`robertatkinson3570/gv2`) is the off-machine safety net.

**Full plan:** see `gotchi-closet/docs/2026-06-20-subgraph-mirror-runbook-local-to-vps.md`.

## What's archived here
- `aavegotchi-core-subgraph/` — source of the ONLY subgraph GotchiCloset depends on
  (cloned from `github.com/aavegotchi/aavegotchi-core-subgraph`, branch `main`, `.git` removed).
- `gotchiverse-2d/` content (this repo's base; upstream `aavegotchi/gotchiverse-2d`) — GV2 client.

## The single critical dependency
GotchiCloset reads everything (gotchis, wearables, Baazaar, lending, realm, **fakes**) from ONE
subgraph:
```
https://api.goldsky.com/api/public/project_cmh3flagm0001r4p25foufjtt/subgraphs/aavegotchi-core-base/prod/gn
```
Mirror that one subgraph and the whole app survives.

## Build the Base subgraph (from aavegotchi-core-subgraph/)
```
yarn install
yarn prepare:base     # mustache config/base.json subgraph.base.yaml > subgraph.yaml
yarn codegen
yarn build
# local: yarn create-local && yarn deploy-local  (graph-node on localhost:8020 / ipfs 5001)
```
Toolchain: `@graphprotocol/graph-cli@0.59.0`, `graph-ts@0.31.0`.

## Base (8453) addresses + start blocks (config/base.json)
| datasource | address | startBlock |
|---|---|---|
| core (aavegotchi diamond) | 0xA99c4B08201F2913Db8D28e71d020c4298F29dBF | 33201946 |
| wearable | 0x052e6c114a166B0e91C2340370d72D4C33752B4b | 33202019 |
| fakeCard | 0xe46B8902dAD841476d9Fee081F1d62aE317206A9 | 33221297 |
| fakeGotchis | 0xAb59CA4A16925b0a4BaC5026C94bEB20A29Df479 | 33221313 |
| realm | 0x4B0040c3646D3c44B8a28Ad7055cfCF536c05372 | 33969747 |

## App external deps (resilience status)
- **Core subgraph** (above) — single point of failure → mirror it.
- **Base RPC** — `VITE_BASE_RPC_URL` + ~6 hardcoded public fallbacks. Resilient.
- **Gotchi SVGs** — rendered on-chain via RPC. Resilient.
- **Static data** — `data/wearableSets.json` vendored in the app repo. Safe.

## Future deps (NOT used by the app yet — dapp-parity specs only)
- **Forge art:** intended `d1ct2dwqrn0rul.cloudfront.net/shared-assets/images/{id}.png`, but
  plain-integer ids 0–500 all return 404 → **id scheme unverified.** Verify against the live dapp
  before any bulk download. Not a current dependency.
- **FAKE art:** `arweave.net/{hash}` (hash from subgraph `fakeGotchiNFTTokens.metadata`).
  Permanent; use directly, never the `dapp.aavegotchi.com` proxy.

_Generated as part of Phase 0 (archive) of the subgraph-mirror runbook._
