# Realm server image (the WebSocket game server in ../server).
# Deps are pure JS (ethers + ws), so no build toolchain is needed — much
# simpler than gotchi-closet's image (which builds native better-sqlite3).
# Build context is the repo root (see docker-compose.yml: context: ..).

FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev

FROM node:20-bookworm-slim AS runner
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends tini \
  && rm -rf /var/lib/apt/lists/* \
  && useradd -m -u 1001 gv2
COPY --from=deps /app/node_modules ./node_modules
COPY --chown=gv2:gv2 server/ ./
# Runtime cache (installations/players JSON) lives here; mounted as a volume
# in docker-compose so it survives rebuilds.
RUN mkdir -p /app/.cache && chown -R gv2:gv2 /app/.cache
USER gv2
ENV NODE_ENV=production
EXPOSE 8080
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "src/index.js"]
