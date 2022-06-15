const mongoose = require("mongoose");
const dbConfig = require("../../../utils/config/db.config");
const env = require("../../../utils/config/env.config");

const CartMongoDao = require("./mongo/collections/Cart.dao");
const MessageMongoDao = require("./mongo/collections/Messagesdao");
const ProductMongoDao = require("./mongo/collections/Products.dao");
const UserMongoDao = require("./mongo/collections/Users.dao");

class CloudDAOs {
  static #dbInstances = {};

  static #typeDB;

  static #DAO = {
    product: {
      mongo: (collection, schema) => new ProductMongoDao(collection, schema),
      firebase: (collection, schema) => new ProductFirebaseDao(collection, schema)
    },
    message: {
      mongo: (collection, schema) => new MessageMongoDao(collection, schema),
      firebase: (collection, schema) => new MessageFirebaseDao(collection, schema)
    },
    user: {
      mongo: (collection, schema) => new UserMongoDao(collection, schema),
      firebase: (collection, schema) => new UserFirebaseDao(collection, schema)
    }
  };

  static #getDao = (collection) => {
    const Schema = require(`../../schemas/${CloudDAOs.#typeDB}/${collection[0].toUpperCase() + collection.substring(1)}.schema`);
    return CloudDAOs.#DAO[collection][CloudDAOs.#typeDB](collection, Schema);
  };

  constructor(type) {
    CloudDAOs.#typeDB = type;
    console.log(`[${type.toUpperCase()}] Connecting to "${env.DB_NAME}" database...`);
    if(!CloudDAOs.#dbInstances.mongo && type == "mongo") {
      console.log("CLASS: CloudDAOs");
      mongoose.connect(dbConfig.mongodb.connect())
        .then(() => console.log(`Connected to the "${env.DB_NAME}" database!`))
        .catch(error => { 
          throw new Error("An error occurred while connecting the database: ", error);
        })
      CloudDAOs.#dbInstances.mongo = this;
      return this;
    } else if(!CloudDAOs.#dbInstances.firebase && type == "firebase") {
      // falta connección
      CloudDAOs.#dbInstances.firebase = this;
    }
    else return CloudDAOs.#dbInstances[type];
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