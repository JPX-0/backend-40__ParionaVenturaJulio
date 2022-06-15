class CrudMongo {
  constructor(model) {
    this.model = model;
    console.log("CLASS: CrudMongo");
  }

  async Create(data) {
    return await this.model(data);
  }

  async ReadAll() {
    return await this.model.find({}, { __v: 0 });
  }

  async ReadOne(filter) {
    return await this.model.findOne(filter, { __v: 0 });
  }

  async Update(filter, data) {
    return await this.model.updateOne(filter, { $set: data });
  }

  async Delete(filter) {
    return await this.model.deleteOne(filter);
  }
}

module.exports = CrudMongo;