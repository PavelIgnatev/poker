module.exports = {
  apps: [
    {
      name: "app1",
      script: "./src/server.js",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      ignore_watch: ["node_modules", "./src/store/*", "./src/modules/filter/filter.js"],
    },
  ],
};
