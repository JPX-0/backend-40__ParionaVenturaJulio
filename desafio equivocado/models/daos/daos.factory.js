const env = require("../../utils/config/env.config");
const CloudDAOs = require('./cloud/cloud.dao');

let DAOFactory;
switch(env.DB_PERSISTENCE_TYPE.toLowerCase()) {
  case 'file':
    DAOFactory = new PostFileDAO();
    break;
  case 'memory':
    DAOFactory = new PostMemoryDAO();
    break;
  case 'cloud':
    if(env.DB_PERSISTENCE_SERVER.toLowerCase() == "mongo" || env.DB_PERSISTENCE_SERVER.toLowerCase() == "firebase") {
      DAOFactory = new CloudDAOs(env.DB_PERSISTENCE_SERVER.toLowerCase()); 
      break;
    } else throw new Error('please, you must choose a database: [MONGO | FIREBASE]');
  default:
    throw new Error('Invalid data source, please provide one of the following [MEMORY | FILE | CLOUD]');
}

module.exports = () => DAOFactory;