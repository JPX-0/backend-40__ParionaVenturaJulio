const ProductRepository = require("./collections/product.repository");
const MessageRepository = require("./collections/message.repository");
const UserRepository = require("./collections/user.repository");

class Repository {
  get product() {
    return new ProductRepository();
  }

  get message() {
    return new MessageRepository();
  }

  get user() {
    return new UserRepository();
  }
}

module.exports = Repository;