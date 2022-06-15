class MongoHelpers {
  constructor(model) {
    this.model = model;
    console.log("CLASS: CrudMongo");
  }

  async create(data) {
    const document = await this.model(data).save();
    return document;
  }
  
  async readAndPopulate(filter, populate) {
    return await this.model.find(filter, { __v: 0 }).populate(populate);
  }

  async readAll(filter) {
    return await this.model.find(filter, { __v: 0 }).lean();
  }

  async readOne(filter) {
    return await this.model.findOne(filter, { __v: 0 }).lean();
  }

  async update(filter, data) {
    return await this.model.updateOne(filter, { $set: data }).lean();
  }

  async delete(filter) {
    return await this.model.deleteOne(filter);
  }
}

module.exports = MongoHelpers;