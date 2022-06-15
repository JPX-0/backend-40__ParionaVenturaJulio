const { infoLogger } = require("../utils/config/logger.config");

const readAllRoutes = (req, res, next) => {
  infoLogger.info({ route: req.url, method: `[${req.method}]` });
  next();
};

module.exports = readAllRoutes;