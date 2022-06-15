const MessageServices = require("./collections/message.service");
const ProductServices = require("./collections/product.service");
const UserServices = require("./collections/user.service");

class Service {
  get message() {
    return new MessageServices()
  }

  get product() {
    return new ProductServices()
  }

  get user() {
    return new UserServices()
  }
}

module.exports = Service;