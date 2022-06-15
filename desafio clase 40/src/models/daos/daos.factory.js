const env = require("../../utils/config/env.config");
const CloudDAOs = require('./cloud/cloud.dao');

console.log("env.DB_PERSISTENCE_TYPE: ", env.DB_PERSISTENCE_TYPE);
console.log("env.DB_PERSISTENCE_SERVER: ", env.DB_PERSISTENCE_SERVER);

let DAOFactory;
switch(env.DB_PERSISTENCE_TYPE.toLowerCase()) {
  case 'file':
    throw new Error('This option was disabled');
  case 'memory':
    throw new Error('This option was disabled');
  case 'cloud':
    switch(env.DB_PERSISTENCE_SERVER.toLowerCase()) {
      case "mongo":
        DAOFactory = new CloudDAOs(env.DB_PERSISTENCE_SERVER.toLowerCase()); 
        break;
      case "firebase":
        throw new Error('This option was disabled');
      default:
        throw new Error('please, you must choose a database: [MONGO | FIREBASE]');
      }
      break;
  default: 
    throw new Error('Invalid data source, please provide one of the following [MEMORY | FILE | CLOUD]');
}

module.exports = () => DAOFactory;