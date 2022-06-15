const ContainerMongo = require("../mongo.container");
const CartMongoDao = require("./Cart.dao");

class UserMongoDao extends ContainerMongo {
  static #instance;
  constructor(collection, schema) {
    if(!UserMongoDao.#instance) {
      super(collection, schema);
      console.log("CLASS: UserMongoDao");
      UserMongoDao.#instance = this;
      return this;
    } 
    else return UserMongoDao.#instance;
  }

  async getByEmail(email) {
    const response = await this.model.ReadOne({ email }, { __v: 0 }).lean();
    return response;
  }
}

module.exports = UserMongoDao;