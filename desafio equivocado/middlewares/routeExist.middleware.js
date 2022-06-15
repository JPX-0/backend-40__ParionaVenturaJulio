const { warnLogger } = require("../utils/config/logger.config");
const STATUS = require("../utils/constants/api.constants");

const routeExist = (req, res, next) => {
  const method = `[${req.method}]`;
  const message = `The route ${req.originalUrl} with method ${method} was not implemented`;
  if(req.originalUrl) {
    warnLogger.warn({ route: req.url, method });
    return res.status(STATUS.NOT_FOUND.code).json({ message });
  }
  next();
};

module.exports = routeExist;