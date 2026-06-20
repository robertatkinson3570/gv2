#!/usr/bin/env bash
# Bootstrap the gv2 realm server on the existing Hostinger VPS (31.97.216.251).
# Run via hPanel Browser Terminal as root — external SSH is refused on this box.
# Idempotent: re-running won't double-create.
#
# Auth to register the runner (pick one, export before running):
#   export RUNNER_TOKEN='AABBCC...'   # from repo Settings > Actions > Runners > New
#   export GH_PAT='ghp_xxx'           # classic PAT, 'repo' scope; script mints the token
#
# STRICT ISOLATION — this box also runs gotchicloset (port 8791) and marquiq:
#   - app dir /root/gv2, runner /opt/actions-runner-gv2, compose project `gv2`
#   - NEVER docker system/volume/network prune; NEVER `docker compose down`
#     without `-p gv2 -f deploy/docker-compose.yml`; NEVER touch other apps.
#   - Does NOT set up nginx/TLS — do that after DNS (see deploy/README.md).

set -euo pipefail

REPO_OWNER="robertatkinson3570"
REPO_NAME="gv2"
APP_DIR="/root/gv2"
RUNNER_DIR="/opt/actions-runner-gv2"
RUNNER_LABEL="gv2-vps"
RUNNER_VERSION="2.317.0"
COMPOSE_PROJECT="gv2"
HEALTH_PORT="8792"

red()    { printf '\033[0;31m%s\033[0m\n' "$*"; }
green()  { printf '\033[0;32m%s\033[0m\n' "$*"; }
yellow() { printf '\033[0;33m%s\033[0m\n' "$*"; }
section(){ printf '\n\033[0;36m=== %s ===\033[0m\n' "$*"; }

[[ "$(id -u)" -eq 0 ]] || { red "Run as root."; exit 1; }
command -v docker >/dev/null 2>&1 || { red "docker not installed. Bailing."; exit 1; }
command -v curl   >/dev/null 2>&1 || { red "curl not installed."; exit 1; }

# --- 1. Self-hosted runner -----------------------------------------------------
section "1/4  GitHub Actions runner ($RUNNER_LABEL)"

if [[ -d "$RUNNER_DIR" && -f "$RUNNER_DIR/.runner" ]]; then
  yellow "runner already configured at $RUNNER_DIR — skipping registration"
else
  if [[ -z "${RUNNER_TOKEN:-}" && -z "${GH_PAT:-}" ]]; then
    red "Need RUNNER_TOKEN or GH_PAT. Easiest path:"
    red "  1. https://github.com/${REPO_OWNER}/${REPO_NAME}/settings/actions/runners/new (Linux x64)"
    red "  2. Copy the long string after --token"
    red "  3. export RUNNER_TOKEN='...'  then re-run this script"
    exit 1
  fi
  mkdir -p "$RUNNER_DIR"; cd "$RUNNER_DIR"
  if [[ ! -f run.sh ]]; then
    yellow "downloading runner v$RUNNER_VERSION"
    curl -fsSL -o runner.tar.gz \
      "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"
    tar xzf runner.tar.gz && rm runner.tar.gz
  fi
  if [[ -n "${RUNNER_TOKEN:-}" ]]; then
    TOKEN="$RUNNER_TOKEN"
  else
    yellow "minting registration token via REST API…"
    RESP=$(curl -fsS -X POST \
      -H "Authorization: Bearer $GH_PAT" \
      -H "Accept: application/vnd.github+json" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      "https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/runners/registration-token")
    if command -v jq >/dev/null 2>&1; then TOKEN=$(echo "$RESP" | jq -r .token)
    elif command -v python3 >/dev/null 2>&1; then TOKEN=$(echo "$RESP" | python3 -c 'import sys,json;print(json.load(sys.stdin)["token"])')
    else TOKEN=$(echo "$RESP" | grep -oP '"token"\s*:\s*"\K[^"]+'); fi
    [[ -n "$TOKEN" && "$TOKEN" != "null" ]] || { red "Failed to get registration token:"; echo "$RESP"; exit 1; }
  fi
  RUNNER_ALLOW_RUNASROOT="1" ./config.sh --url "https://github.com/${REPO_OWNER}/${REPO_NAME}" \
    --token "$TOKEN" --labels "$RUNNER_LABEL" --name "$RUNNER_LABEL" --unattended
  RUNNER_ALLOW_RUNASROOT="1" ./svc.sh install
  RUNNER_ALLOW_RUNASROOT="1" ./svc.sh start
fi
green "runner status:"; cd "$RUNNER_DIR" && ./svc.sh status || true

# --- 2. Repo checkout ----------------------------------------------------------
section "2/4  Repo checkout"

if [[ -d "$APP_DIR/.git" ]]; then
  yellow "$APP_DIR exists — pulling latest"
  cd "$APP_DIR"; git fetch --all --prune; git reset --hard origin/master
else
  git clone "https://github.com/${REPO_OWNER}/${REPO_NAME}.git" "$APP_DIR"
fi
green "$APP_DIR $(git -C "$APP_DIR" rev-parse --short HEAD)"

# --- 3. .env -------------------------------------------------------------------
section "3/4  .env"

if [[ -f "$APP_DIR/.env" ]]; then
  yellow ".env already exists — leaving as-is. Edit by hand to change RPC/auth."
else
  cat > "$APP_DIR/.env" <<'EOF'
# Public wss URL handed to clients by GET /realm/socket (behind nginx TLS).
PUBLIC_WS_URL=wss://realm.gotchicloset.com

# Base RPC. Public default works but drops calls under load — replace with a free
# Alchemy "Base Mainnet" URL, OR set repo secret BASE_RPC (synced on each deploy).
BASE_RPC=https://base-rpc.publicnode.com

# --- Auth (realm server security; defaults ON in code) ---
# For a fully keyless public demo, set both to false. Leaving ON requires wallet
# sign-in (SIWE) keyed to the frontend domain below.
ENFORCE_AUTH=true
REQUIRE_SIWE=true
SIWE_DOMAIN=gv2.gotchicloset.com
EOF
  chmod 600 "$APP_DIR/.env"; chown root:root "$APP_DIR/.env"
  green "wrote $APP_DIR/.env (edit BASE_RPC / auth flags as needed)"
fi

# --- 4. Build + start + health -------------------------------------------------
section "4/4  docker compose up (project: $COMPOSE_PROJECT)"

cd "$APP_DIR"
docker compose -p "$COMPOSE_PROJECT" -f deploy/docker-compose.yml up -d --build
docker compose -p "$COMPOSE_PROJECT" -f deploy/docker-compose.yml ps

for i in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS "http://127.0.0.1:${HEALTH_PORT}/realm/socket" > /tmp/gv2_health.json 2>/dev/null; then
    green "health response:"; cat /tmp/gv2_health.json; echo; break
  fi
  yellow "wait $i…"; sleep 3
done
[[ -s /tmp/gv2_health.json ]] || { red "health check failed. logs:"; docker compose -p "$COMPOSE_PROJECT" -f deploy/docker-compose.yml logs --tail=80; exit 1; }

section "Done"
green "Realm server up at 127.0.0.1:${HEALTH_PORT} inside the VPS."
green "Next (separate from this script):"
green "  - DNS: A record realm.gotchicloset.com -> 31.97.216.251"
green "  - nginx + certbot for realm.gotchicloset.com (see deploy/README.md, deploy/nginx-realm.conf)"
green "  - After that, every push to master auto-deploys via GitHub Actions."
