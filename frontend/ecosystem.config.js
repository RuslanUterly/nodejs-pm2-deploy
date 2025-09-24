require('dotenv').config({ path: __dirname + '/.env.deploy' });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: "~/.ssh/vm_access/ssh-key-1758536918231",
      "post-deploy": 'source $HOME/.nvm/nvm.sh && cd frontend && pwd && export NODE_OPTIONS=--openssl-legacy-provider && npm i && npm run build'
    },
  },
}; 