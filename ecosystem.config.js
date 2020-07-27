module.exports = {
  apps : [{
    name: 'Health Heatmap UI',
    script: 'yarn start -p 3040',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '4G',
    env: {
      NODE_ENV: 'development',
      PORT: 3040,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3040
    }
  }],

  deploy : {
    production : {
      user : 'metastring',
      host : '49.206.244.232',
      ref  : 'origin/master',
      repo : 'git@github.com:Metastring/health-heatmap-ui.git',
      path : '/var/www//health-heatmap',
      'pre-deploy-local': '',
      'post-deploy' : 'yarn && yarn next build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
