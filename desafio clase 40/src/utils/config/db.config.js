const env = require("./env.config");

module.exports = {
  mongodb: {
    connect: () => `mongodb+srv://${env.DB_MAIL}:${env.DB_PASS}@${env.DB_DEPLOY}.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`,
    connectTo: database => `mongodb+srv://${env.DB_MAIL}:${env.DB_PASS}@${env.DB_DEPLOY}.mongodb.net/${database}?retryWrites=true&w=majority`
  }
};