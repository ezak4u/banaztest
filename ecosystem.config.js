module.exports = {
  apps : [{
    name        : "banyertester",
    script      : "/index.js", // path needs to be relative from ecosystem.config.js
    watch       : true, // any changes to app folder will get pm2 to restart app
    env         : {
      "NODE_ENV": "development", // define env variables here
    }
  }]
}