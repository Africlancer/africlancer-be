module.exports = {
  apps: [
    {
      name: 'dev-africlancer-be(6110)',
      script: './dist/main.js',
      evn_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
