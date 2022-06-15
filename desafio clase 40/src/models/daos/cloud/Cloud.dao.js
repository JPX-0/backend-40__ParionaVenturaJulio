const mongoose = require("mongoose");
const dbConfig = require("../../../utils/config/db.config");
const env = require("../../../utils/config/env.config");

const MessageMongoDao = require("./mongo/collections/Messagesdao");
const ProductMongoDao = require("./mongo/collections/Products.dao");
const UserMongoDao = require("./mongo/collections/Users.dao");

class CloudDAOs {
  static #dbConnected;

  static #DAO = {
    product: (collection, schema) => new ProductMongoDao(collection, schema),
    message: (collection, schema) => new MessageMongoDao(collection, schema),
    user: (collection, schema) => new UserMongoDao(collection, schema)
  };

  static #getDao = (collection) => {
    const Schema = require(`../../schemas/mongo/${collection[0].toUpperCase() + collection.substring(1)}.schema`);
    return CloudDAOs.#DAO[collection](collection, Schema);
  };

  constructor(type) {
    console.log(`[${type.toUpperCase()}] Connecting to "${env.DB_NAME}" database...`);
    if(!CloudDAOs.#dbConnected) {
      console.log("CLASS: CloudDAOs");
      mongoose.connect(dbConfig.mongodb.connect())
        .then(() => console.log(`Connected to the "${env.DB_NAME}" database!`))
        .catch(error => { 
          throw new Error("An error occurred while connecting the database: ", error);
        })
      CloudDAOs.#dbConnected = this;
      return this;
    } 
    else return CloudDAOs.#dbConnected;
  }

  get product() {
    return CloudDAOs.#getDao("product");
  }

  get message() {
    return CloudDAOs.#getDao("message");
  }

  get user() {
    return CloudDAOs.#getDao("user");
  }
};

module.exports = CloudDAOs;