const ContainerMongo = require("../mongo.container");
// const CrudMongo = require("../mongo.crud");

class MessageMongoDao extends ContainerMongo {
  static #instance;
  constructor(collection, schema) {
    if(!MessageMongoDao.#instance) {
      super(collection, schema);
      console.log("CLASS: MessageMongoDao");
      MessageMongoDao.#instance = this;
      return this;
    } 
    else return MessageMongoDao.#instance;
  }

  async getAll() {
    return await this.model.readAndPopulate({}, "author");
  }
}

module.exports = MessageMongoDao;