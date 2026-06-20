# gv2 deploy

Resurrected gotchiverse-2d. Two pieces:

| Piece              | Host                              | URL                       |
| ------------------ | -------------------------------- | ------------------------- |
| Frontend (Next.js) | Vercel                           | `gv2.gotchicloset.com`    |
| Realm server (ws)  | Hostinger VPS (Docker + nginx)   | `realm.gotchicloset.com`  |

**Deploy model (mirrors gotchi-closet):** the VPS (`187.77.15.149`, `srv1360330`)
**refuses external SSH**. A self-hosted GitHub Actions runner labelled `gv2-vps`
runs *on* the box; every push to `master` rebuilds the isolated `gv2`
docker-compose project. One-time bootstrap is done via the **hPanel Browser
Terminal**, never SSH.

The realtime WebSocket traffic goes to the VPS, not through Vercel, so Vercel
only serves static assets → free Hobby tier is plenty.

---

## Isolation guarantees — DO NOT MODIFY

This box also hosts **gotchicloset** (port 8791) and **marquiq**. gv2 is strictly
namespaced so it can never touch them:

| Resource            | gv2 value                       |
| ------------------- | ------------------------------- |
| App dir             | `/root/gv2`                     |
| Compose project     | `gv2` (always `-p gv2`)         |
| Container           | `gv2-realm`                     |
| Host port bind      | `127.0.0.1:8792` (closet=8791)  |
| Volume              | `gv2_realm_data`                |
| GH Actions runner   | label `gv2-vps`, `/opt/actions-runner-gv2` |
| nginx site          | `/etc/nginx/sites-*/realm.gotchicloset.com` |

**RULES:**
- ✅ Always `docker compose -p gv2 -f deploy/docker-compose.yml ...`
- ✅ Only edit the `realm.gotchicloset.com` nginx site; `nginx -t && systemctl reload nginx` (never restart)
- ❌ NEVER `docker system/volume/network prune` (wipes other apps' data)
- ❌ NEVER `docker compose down` without `-p gv2 -f deploy/docker-compose.yml`
- ❌ NEVER touch `/root/gotchicloset`, `/root/marquiq`, `/opt/actions-runner*` (other suffixes), or unfamiliar nginx sites

---

## 1. DNS (on gotchicloset.com)

- `A`     `realm.gotchicloset.com` → `187.77.15.149`
- `CNAME` `gv2.gotchicloset.com`   → the target Vercel shows under the project's Domains tab
  (typically `cname.vercel-dns.com`)

## 2. One-time VPS bootstrap (hPanel Browser Terminal, as root)

gv2 is a **private** repo, so use a classic PAT (`repo` scope) — one token
authenticates the script fetch, the private clone, the runner registration, and
every later GitHub Actions `git fetch`:

```bash
export GH_PAT='ghp_YOUR_TOKEN'   # mint: https://github.com/settings/tokens/new (classic, 'repo')
curl -fsSL -H "Authorization: token $GH_PAT" -H "Accept: application/vnd.github.raw" \
  "https://api.github.com/repos/robertatkinson3570/gv2/contents/deploy/setup-vps.sh?ref=master" | bash
```

Then, after the DNS A record is live, add nginx + TLS:

```bash
cd /root/gv2
cp deploy/nginx-realm.conf /etc/nginx/sites-available/realm.gotchicloset.com
ln -sf /etc/nginx/sites-available/realm.gotchicloset.com /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d realm.gotchicloset.com --non-interactive --agree-tos -m ratkinson701@gmail.com
```

## 3. Base RPC key (optional but recommended)

The realm server defaults to a public RPC that drops calls under load. Set a free
Alchemy "Base Mainnet" URL one of two ways:
- Repo secret (preferred): add `BASE_RPC` at
  `github.com/robertatkinson3570/gv2/settings/secrets/actions` — the deploy
  workflow syncs it into `.env` on every run.
- Or edit `/root/gv2/.env` directly and `docker compose -p gv2 -f deploy/docker-compose.yml up -d`.

## 4. Vercel (frontend)

Already deployed via CLI. Key facts:
- Project root = the Next app (repo root).
- Env (Production): `NEXT_PUBLIC_API_URL = https://realm.gotchicloset.com` — it's
  `NEXT_PUBLIC_*`, baked at **build time**; redeploy after changing.
- Custom domain `gv2.gotchicloset.com` added in the project Domains tab.

Client flow: fetch `${NEXT_PUBLIC_API_URL}/realm/socket` → get back `socketUrl`
(= server `PUBLIC_WS_URL`) → open that WebSocket.

## 5. Link from gotchi-closet

A plain card / `<a href="https://gv2.gotchicloset.com">` in closet — no build or
deploy coupling.

---

## Auto-deploy

After bootstrap, push to `master` (touching `server/**` or `deploy/**`) → the
`gv2-vps` runner rebuilds. Manual fire:

```bash
gh workflow run "Deploy realm server to VPS"
gh run watch "$(gh run list --workflow='Deploy realm server to VPS' --limit 1 --json databaseId --jq '.[0].databaseId')"
```

## Verify

```bash
# from anywhere, once TLS is up:
curl https://realm.gotchicloset.com/realm/socket
# -> {"socketUrl":"wss://realm.gotchicloset.com","id":"citaadel-0"}

# on the VPS:
cd /root/gv2 && docker compose -p gv2 -f deploy/docker-compose.yml logs -f
```

## Env contract (server — see [../server/src/config.js](../server/src/config.js))

| Var             | Value / default                  | Notes                                  |
| --------------- | -------------------------------- | -------------------------------------- |
| `PORT`          | `8080` (in-container)            | nginx → `127.0.0.1:8792` → container 8080 |
| `PUBLIC_WS_URL` | `wss://realm.gotchicloset.com`   | returned by `GET /realm/socket`        |
| `BASE_RPC`      | Alchemy Base URL (or public)     | repo secret or `.env`                  |
| `ENFORCE_AUTH` / `REQUIRE_SIWE` | `true` (code default) | set both `false` for a keyless demo    |
| `SIWE_DOMAIN`   | `gv2.gotchicloset.com`           | must match the frontend origin         |

## Notes / gotchas

- nginx for this site **must** forward `Upgrade`/`Connection` headers (it's
  WebSocket, unlike closet's REST API) — see `deploy/nginx-realm.conf`.
- The `/realm/.../signature/channel/get` endpoint returns an empty signature
  (`{}` → `0x`) — a Base demo shortcut, **not** a production write path.
- Single realm instance only — in-memory world state, do not scale horizontally.
- Legacy Polygon Alchemy/Infura keys in `shared_code/web3/shared.const.web3.ts`
  are already public in the `aavegotchi` upstream — rotate them.
