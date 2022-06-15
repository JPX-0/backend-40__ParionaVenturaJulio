class CreateDTO {
  constructor(postItem) {
    Object.assign(this, postItem);
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
};

module.exports = CreateDTO;