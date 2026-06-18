# Gotchiverse 2D

Gotchiverse 2D is the browser game client for the Aavegotchi Gotchiverse. It is a Next.js, React, TypeScript, and Phaser application with game data and shared helpers vendored in `shared_code/`.

## Requirements

- Node.js 20 or newer
- Yarn 1.22.x

This repo uses `yarn.lock`; do not use `npm install`.

## Quick Start

```bash
git clone https://github.com/aavegotchi/gotchiverse-2d.git
cd gotchiverse-2d
yarn install --frozen-lockfile
cp .env.example .env
yarn dev
```

Open [http://localhost:3001](http://localhost:3001).

The default `.env.example` values are safe placeholders. Some wallet, captcha, NFT, Discord, Sentry, and backend-backed flows need real environment values before they work end to end.

## Common Scripts

```bash
yarn dev        # Start the local Next.js dev server on port 3001
yarn lint       # Type-check the project
yarn build      # Build the production app
yarn verify     # Run lint and production build
yarn start      # Start a built production app
```

There is no separate server package in this public repo. Backend API calls are configured with `NEXT_PUBLIC_API_URL` and related environment variables.

## Environment Files

The main local command, `yarn dev`, reads `.env`.

Other scripts read environment-specific files:

```bash
yarn dev:local         # .env.local.env
yarn dev:prod          # .env.prod.env
yarn dev:alpha         # .env.alpha.env
yarn dev:beta          # .env.beta.env
yarn dev:combat        # .env.combat.env
yarn dev:dev           # .env.development.env
yarn dev:local:mumbai  # .env.local.env with ALCHEMICA_NETWORK=mumbai
```

Keep real env files out of Git. Only `.env.example` should be committed.

## Shared Code

`shared_code/` is committed directly in this public repository. It is not a Git submodule, so a normal clone contains everything needed to install, type-check, and build the app.

## Docker

Build and run the production image:

```bash
docker build -t gotchiverse-2d .
docker run --rm -p 3001:3001 --env-file .env gotchiverse-2d
```

## Security

- Do not commit real `.env` files, API keys, private keys, mnemonics, logs, or generated build output.
- Run `yarn audit` before dependency updates are merged.
- Run `gitleaks dir . --redact` before publishing sensitive changes.

GitHub secret scanning, push protection, and Dependabot security updates are enabled on the public repository.
