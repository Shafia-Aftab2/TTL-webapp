module.exports = {
  apps: [
    {
      name: "talkie-web-app",
      script: "./node_modules/@vue/cli-service/bin/vue-cli-service.js",
      args: "serve -s dist",
      env_development: {
        PORT: 3537,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 3023,
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "SSH_USERNAME",
      host: "SSH_HOSTMACHINE",
      ref: "origin/master",
      repo: "GIT_REPOSITORY",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
