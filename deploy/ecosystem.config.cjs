// PM2 process config for the gv2 realm server (the WebSocket game server in
// ../server). The legacy /ecosystem.config.js is the OLD frontend (next start)
// and is obsolete now that the frontend runs on Vercel — ignore it.
//
// On the VPS, from the repo root (/srv/gv2):
//   cd server && npm ci --omit=dev && cd ..
//   export BASE_RPC='https://base-mainnet.g.alchemy.com/v2/<your-key>'
//   pm2 start deploy/ecosystem.config.cjs
//   pm2 save && pm2 startup        # survive reboots
//
// Env vars below mirror server/src/config.js. Real secrets (BASE_RPC) are set
// via the shell export above and inherited by PM2 — do NOT commit a key here.

module.exports = {
  apps: [
    {
      name: 'gv2-realm',
      cwd: './server',
      script: 'src/index.js',
      // Single instance, fork mode: the world state lives in memory, so the
      // server must NOT be clustered or run as multiple instances.
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      env: {
        PORT: 8080,
        PUBLIC_WS_URL: 'wss://realm.gotchicloset.com',
        // BASE_RPC is intentionally omitted — export it in the shell before
        // `pm2 start` so the key never lands in the repo.
      },
    },
  ],
};
