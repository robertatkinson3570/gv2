FROM node:20-bookworm-slim AS deps

WORKDIR /app

COPY package.json yarn.lock ./
COPY vendor ./vendor

RUN yarn install --frozen-lockfile

FROM node:20-bookworm-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM node:20-bookworm-slim AS runner

ENV NODE_ENV=production
ENV PORT=3001

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3001

CMD ["yarn", "start"]
