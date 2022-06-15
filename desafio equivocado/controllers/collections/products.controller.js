const CreateDTO = require('../../models/dtos/create.dto');
const StandardizeDTO = require('../../models/dtos/standardize.dto');
const UpdateDTO = require('../../models/dtos/update.dto');
const Repository = require('../../models/repositories/index.repository');
const Service = require('../../services/index.service');
const STATUS = require('../../utils/constants/api.constants');

class ProductController {
  static repo = new Repository().product;
  static validate = new Service().product;
  constructor() {
		console.log("CLASS: ProductController");
  }

  async getData(req, res, next) {
    try {
      const validateReq = ProductController.validate.render(req);
      const response = await ProductController.repo.getData(validateReq);
      return res.status(STATUS.OK.code).json(response);
    }
    catch(error) {
      next(error);
    }
  }

  async postData(req, res, next) {
    try {
      const validateReq = ProductController.validate.generate(req);
      const validateData = ProductController.validate.format(validateReq);
      const dataStandar = new StandardizeDTO([validateData]).product;
      if(validateData) {
        const response = await ProductController.repo.save(new CreateDTO(dataStandar));
        return res.status(STATUS.CREATED.code).json(`${response}`);
      }
    }
    catch(error) {
      next(error);
    }
  }

  async putData(req, res, next) {
    try {
      const validateReq = ProductController.validate.render(req);
      const foundData = await ProductController.repo.getById(validateReq.id);
      const updatedData = { ...foundData, ...req.body }
      const validateData = ProductController.validate.format(updatedData);
      if(validateData) {
        await ProductController.repo.update(validateReq.id, new UpdateDTO(updatedData));
        return res.status(STATUS.ACEPTED.code).json(`${validateReq.id}`);
      }
    }
    catch(error) {
      next(error);
    }
  }

  async deleteData(req, res, next) {
    try {
      const validateReq = ProductController.validate.render(req);
      const foundData = await ProductController.repo.getById(validateReq.id);
      if(foundData) {
        await ProductController.repo.deleteById(validateReq.id);
        return res.status(STATUS.ACEPTED.code).json(`${validateReq.id}`);
      }
    }
    catch(error) {
      next(error);
    }
  }
}

module.exports = ProductController;