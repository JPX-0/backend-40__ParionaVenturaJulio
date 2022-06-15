const CreateDTO = require('../../models/dtos/create.dto');
const Repository = require('../../models/repositories/index.repository');
const Service = require('../../services/index.service');
const STATUS = require('../../utils/constants/api.constants');

class MessageController {
  static repo = new Repository().message;
  static validate = new Service().message;
  constructor() {
		console.log("CLASS: MessageController");
  }

  async getData(req, res, next) {
    const { query, params } = req;
    try {
      const validateReq = MessageController.validate.render(req);
      const response = await MessageController.repo.getData(validateReq);
      return res.status(STATUS.OK.code).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async postData(req, res, next) {
    const { user, body, query } = req;
    try {
      const validateReq = MessageController.validate.render(req);
      const newMsg = {
        author: user._id,
        text: validateReq.text
      }
      const response = await MessageController.repo.save(new CreateDTO(newMsg));
      return res.status(STATUS.CREATED.code).json(response);
    }
    catch(error) {
      next(error);
    }
  }
}

module.exports = MessageController;