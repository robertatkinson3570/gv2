module.exports = {
  apps: [
    {
      name: 'realm-fe',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],

  deploy: {
    beta: {
      user: 'ubuntu',
      host: ['gotchi.realm.fe1'],
      ref: 'origin/staging',
      repo: 'git@github.com:aavegotchi/aavegotchi-realm.git',
      path: '/home/ubuntu/repos/aavegotchi-realm',
      'post-deploy': 'git submodule update --init --recursive && yarn && yarn build && pm2 startOrGracefulReload ecosystem.config.js --update-env',
    },
  },
};
