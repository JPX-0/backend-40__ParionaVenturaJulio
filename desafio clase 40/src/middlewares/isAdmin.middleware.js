const STATUS = require("../../utils/constants/api.constants");
const formatResponse = require("../../utils/formatter/send.format");

const isAdmin = (req, res, next) => {
  const admin = req.user.admin;
  if(admin) return next();
  const message = `You do not have the necessary permissions to access this page`;
  res.status(STATUS.NOT_AUTHORIZED.code).json(formatResponse(true, STATUS.NOT_AUTHORIZED, message));
};

module.exports = isAdmin;