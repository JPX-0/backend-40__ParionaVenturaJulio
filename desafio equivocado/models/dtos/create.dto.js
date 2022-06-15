class CreateDTO {
  constructor(postItem, id) {
    Object.assign(this, postItem);
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    if(id) {
      this._id = id;
    }
  }
};

module.exports = CreateDTO;