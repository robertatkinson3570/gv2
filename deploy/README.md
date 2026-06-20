# gv2 deploy

Resurrected gotchiverse-2d. Two pieces, both on subdomains of `gotchicloset.com`
(you already own it — no domain purchase):

| Piece              | Host          | URL                       |
| ------------------ | ------------- | ------------------------- |
| Frontend (Next.js) | Vercel        | `gv2.gotchicloset.com`    |
| Realm server (ws)  | VPS + Caddy   | `realm.gotchicloset.com`  |

**Why the split:** the realm server holds an in-memory world + a 30 Hz tick loop
and persistent WebSockets — Vercel's serverless functions can't do that, so it
lives on your VPS. And because the frontend is HTTPS, the socket **must** be
`wss://` — that's what Caddy provides (auto Let's Encrypt cert on the subdomain).

The realtime traffic (position updates) rides the WebSocket to the VPS, **not**
through Vercel, so Vercel only serves static assets → free Hobby tier is plenty.

---

## 1. DNS (on gotchicloset.com)

- `A`     `realm.gotchicloset.com` → `<VPS public IP>`
- `CNAME` `gv2.gotchicloset.com`   → (the target Vercel shows after you add the domain)

## 2. Base RPC (free)

Create a free **Alchemy** "Base Mainnet" app, copy the HTTPS URL. Used
server-side only. The realm server defaults to a flaky public RPC
(`base-rpc.publicnode.com`) that drops calls under load — a dedicated key is the
one thing that keeps the demo up when several people join at once.

## 3. VPS — realm server

Install Node 20+, Caddy, PM2. Then:

```sh
git clone <private-repo> /srv/gv2 && cd /srv/gv2
cd server && npm ci --omit=dev && cd ..

export BASE_RPC='https://base-mainnet.g.alchemy.com/v2/<key>'
pm2 start deploy/ecosystem.config.cjs && pm2 save && pm2 startup

sudo caddy start --config /srv/gv2/deploy/Caddyfile   # auto-TLS for realm.gotchicloset.com
```

Firewall: open `80` + `443`. Keep `8080` localhost-only (Caddy is the only thing
that should reach it).

## 4. Vercel — frontend

- Import the private repo as a project (repo root = the Next app).
- **Env (Production):** `NEXT_PUBLIC_API_URL = https://realm.gotchicloset.com`
  — this is `NEXT_PUBLIC_*`, so it's baked at **build time**; set it before the
  first build or redeploy after.
- Add domain `gv2.gotchicloset.com`, then set the CNAME Vercel gives you (step 1).

## 5. Link from gotchi-closet

A plain card / `<a href="https://gv2.gotchicloset.com">` in the closet app — no
build/deploy coupling, so if gv2 falls over, closet is untouched.

---

## Env contract (server — see [../server/src/config.js](../server/src/config.js))

| Var             | Value                              | Notes                                  |
| --------------- | ---------------------------------- | -------------------------------------- |
| `PORT`          | `8080`                             | Caddy reverse-proxies to it            |
| `PUBLIC_WS_URL` | `wss://realm.gotchicloset.com`     | returned by `GET /realm/socket`        |
| `BASE_RPC`      | your Alchemy Base URL              | set via shell export, never committed  |

Client (Vercel build): `NEXT_PUBLIC_API_URL = https://realm.gotchicloset.com`
— the client fetches `${NEXT_PUBLIC_API_URL}/realm/socket`, gets back the
`socketUrl` (= `PUBLIC_WS_URL`), then opens that WebSocket.

## Notes / gotchas

- Root `/ecosystem.config.js` is the **legacy** frontend PM2 config (old Polygon
  `aavegotchi-realm` repo). Obsolete — frontend is on Vercel now. Ignore it.
- The `/realm/.../signature/channel/get` endpoint returns an empty signature
  (`{}` → `0x`) — a Base demo shortcut, **not** a production write path.
- Single realm instance only — in-memory world state, do not scale horizontally.
