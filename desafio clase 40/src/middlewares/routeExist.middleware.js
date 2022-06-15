const STATUS = require("../utils/constants/api.constants");
const formatResponse = require("../utils/formatter/send.format");
const { warnLogger } = require("../utils/config/logger.config");

const routeExist = (req, res, next) => {
  const method = `[${req.method}]`;
  const message = `The route ${req.originalUrl} with method ${method} was not implemented`;
  if(req.originalUrl) {
    warnLogger.warn({ route: req.url, method });
    return res.status(STATUS.NOT_FOUND.code).json(formatResponse(true, STATUS.NOT_FOUND, message));
  }
  next();
};

module.exports = routeExist;