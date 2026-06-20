# Realm server image (the WebSocket game server in ../server).
# Deps are pure JS (ethers + ws), so no build toolchain is needed.
#
# IMPORTANT: the server reads ../../shared_code/data/{parcels,installations,tiles}.json
# at runtime (parcels.js, installations.js, alchemica.js). So the image must keep
# server/ and shared_code/ as SIBLINGS under /app, exactly like the repo, or the
# `../../shared_code` paths resolve to nothing and the world loads with no parcels
# or collision. Build context is the repo root (docker-compose.yml: context: ..).

FROM node:20-bookworm-slim AS deps
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

FROM node:20-bookworm-slim AS runner
WORKDIR /app/server
RUN apt-get update && apt-get install -y --no-install-recommends tini \
  && rm -rf /var/lib/apt/lists/* \
  && useradd -m -u 1001 gv2
COPY --from=deps /app/server/node_modules ./node_modules
COPY --chown=gv2:gv2 server/ ./
# Sibling of /app/server so server/src/* can read ../../shared_code/data/*.json
COPY --chown=gv2:gv2 shared_code/ /app/shared_code/
# Runtime cache (installations/players JSON); mounted as a volume in compose.
RUN mkdir -p /app/server/.cache && chown -R gv2:gv2 /app
USER gv2
ENV NODE_ENV=production
EXPOSE 8080
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "src/index.js"]
