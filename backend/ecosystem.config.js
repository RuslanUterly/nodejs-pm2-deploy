const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env.deploy") });

const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPO } = process.env;

module.exports = {
  apps: [
    {
      name: "mesto-api",
      script: "dist/app.js",
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: "~/.ssh/vm_access/private",
      "pre-deploy-local": `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      "post-deploy":
        "cd backend && pwd && npm ci && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production",
    },
  },
}; 