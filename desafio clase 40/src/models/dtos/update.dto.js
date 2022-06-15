class UpdateDTO {
  constructor(postItem) {
    Object.assign(this, postItem);
    this.updatedAt = Date.now();
  }
};

module.exports = UpdateDTO;