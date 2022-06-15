const MessageController = require("./collections/messagescontroller");
const ProductController = require("./collections/products.controller");
const UserController = require("./collections/users.controller");

class Controller {
  get product() {
    return new ProductController();
  }

  get message() {
    return new MessageController();
  }

  get user() {
    return new UserController();
  }
}

module.exports = Controller;