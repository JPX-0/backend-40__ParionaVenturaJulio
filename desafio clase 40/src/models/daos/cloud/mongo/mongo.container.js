const mongoose = require("mongoose");
const MongoHelpers = require("./mongo.crud");

class ContainerMongo {
  constructor(collection, schema) {
    console.log("Error?: ", collection);
    this.model = new MongoHelpers(mongoose.model(collection, schema));
    console.log("CLASS: ContainerMongo");
  }

  async getAll() {
    return await this.model.readAll({}, { __v: 0 });
  }

  async getById(id) {
    return await this.model.readOne({ _id: id }, { __v: 0 });
  }

  async save(data) {
    return await this.model.create(data);
  }

  async updateById(id, data) {
    return await this.model.update({ _id: id }, data);
  }

  async deleteById(id) {
    return await this.model.delete({ _id: id });
  }
}

module.exports = ContainerMongo;