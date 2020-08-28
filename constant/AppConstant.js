const config = require('./config.json')[process.env.NODE_ENV];

export default {
  config:{
      appBaseUrl: config.apiBaseUrl,
      nakshaApi: config.nakshaApi,
  }
}
