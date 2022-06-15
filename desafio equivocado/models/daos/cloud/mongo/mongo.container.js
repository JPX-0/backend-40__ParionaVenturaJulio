const CrudMongo = require("./mongo.crud");
const mongoose = require("mongoose");

class ContainerMongo {
  constructor(collection, schema) {
    this.model = new CrudMongo(mongoose.model(collection, schema));
    console.log("CLASS: ContainerMongo");
  }

  async getAll() {
    return await this.model.ReadAll().lean();
  }

  async getById(id) {
    return await this.model.ReadOne({ _id: id }).lean();
  }

  async save(data) {
    return await this.model.Create(data).save();
  }

  async updateById(id, data) {
    return await this.model.Update({ _id: id }, data).lean();
  }

  async deleteById(id) {
    return await this.model.Delete({ _id: id });
  }
}

module.exports = ContainerMongo;