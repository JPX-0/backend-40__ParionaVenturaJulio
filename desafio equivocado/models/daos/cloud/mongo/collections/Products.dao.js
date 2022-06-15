const ContainerMongo = require("../mongo.container");

class ProductMongoDao extends ContainerMongo {
  static #instance;
  constructor(collection, schema) {
    if(!ProductMongoDao.#instance) {
      super(collection, schema);
      console.log("CLASS: ProductMongoDao");
      ProductMongoDao.#instance = this;
      return this;
    } 
    else return ProductMongoDao.#instance;
  }

  async getByName(title) {
    return await this.model.ReadOne({ title }, { __v: 0 }).lean();
  }

  async getByPrice(price) {
    return await this.model.ReadAll({ price: { $lt: price } }, { __v: 0 }).lean();
  }
}

module.exports = ProductMongoDao;