const mongoose = require("mongoose");
const CrudMongo = require("./mongo.crud");

class ContainerMongo {
  constructor(collection, schema) {
    this.model = new CrudMongo(mongoose.model(collection, schema))
    console.log("CLASS: ContainerMongo");
  }

  async getAll() {
    return await this.model.ReadAll({}, { __v: 0 });
  }

  async getById(id) {
    return await this.model.ReadOne({ _id: id }, { __v: 0 });
  }

  async save(data) {
    return await this.model.Create(data);
  }

  async updateById(id, data) {
    return await this.model.Update({ _id: id }, data);
  }

  async deleteById(id) {
    return await this.model.Delete({ _id: id });
  }
}

module.exports = ContainerMongo;