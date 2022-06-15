const mongoose = require("mongoose");

class CrudMongo {
  constructor(model) {
    this.model = model;
    console.log("CLASS: CrudMongo");
  }

  async Create(data) {
    const document = await this.model(data).save();
    return document;
  }

  async ReadAndPopulate(filter, populate) {
    return await this.model.find(filter, { __v: 0 }).populate(populate);
  }

  async ReadAll(filter) {
    return await this.model.find(filter, { __v: 0 }).lean();
  }

  async ReadOne(filter) {
    return await this.model.findOne(filter, { __v: 0 }).lean();
  }

  async Update(filter, data) {
    return await this.model.updateOne(filter, { $set: data }).lean();
  }

  async Delete(filter) {
    return await this.model.deleteOne(filter);
  }
}

module.exports = CrudMongo;