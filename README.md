## Client Side
 
`yarn` to install node modules (don't use `npm install` as we don't want to mix package managers and create duplicate lock files)
Then use`yarn prepare` to set up `husky` precommit hooks

```bash
# With a local server
`yarn dev`

# With a tunnelled server
`yarn dev:prod`
```

With localtunnel on first connection, go to https://aavegotchi-realm.loca.lt/ and press "click to continue" to allow cors.
Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Env Vars

Create an `.env` and `.env.prod.env` file. In .env add `REALM_NETWORK='kovan' SERVER_URL='http://localhost:3002'`and within .env.prod.env add `REALM_NETWORK='matic'` (or kovan) `SERVER_URL='https://aavegotchi-realm.loca.lt/'`

## aavegotchi-shared-code

Be sure to check out this repo as it's a shared git submodule dependency https://github.com/aavegotchi/aavegotchi-shared-code. This project won't run without it.
You should follow the steps outlined in that git repo's README. TLDR; run `git config --global submodule.recurse true` once. Then `git submodule update --recursive --remote` to update to the latest shared resources. The git submodule does not get updated with `git pull`.

## Server Side

For the server we are allowing two blockchain networks, kovan and polygon.
Open a development local server with yarn server or yarn server:prod. (server URL: http://localhost:3002)

To expose the local server we are using a tunnelling service. (server URL: https://aavegotchi-realm.loca.lt/)


```bash
# Local server on kovan testnet
`yarn server:dev`

# Local server on polygon network
`yarn server:prod`

# Server with localtunnel on kovan testnet
`yarn tunnel-server`

# Server with localtunnel on polygon network
`yarn tunnel-server:prod`
```

## Git Branch Workflow and Deploying

ALPHA:
Alpha is where our bleeding-edge, definitely-don't-release-yet work is pushed. 
Alpha is on auto-deploy through Vercel once code is pushed to the `alpha` branch. Once deployed, the url is http://alpha.gotchiverse.io/ .   

DEVELOPMENT:
Development is where our current "next to be release" code is merged and pushed. Once deployed, the url is https://development.gotchiverse.io . 

STAGING:
Staging is on auto-deploy through Vercel once code is pushed to the staging branch. Once deployed, the url is http://beta.gotchiverse.io/ .   

PRODUCTION:
Production is on auto-deploy through Vercel once code is pushed to `master`. Once deployed, the url is https://verse.aagegotchi.com/ .




