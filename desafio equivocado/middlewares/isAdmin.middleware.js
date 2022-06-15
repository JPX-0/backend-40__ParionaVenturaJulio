const STATUS = require("../utils/constants/api.constants");

const isAdmin = (req, res, next) => {
  const admin = req.user.admin;
  if(admin) return next();
  const message = `You do not have the necessary permissions to access this page`;
  res.status(STATUS.NOT_AUTHORIZED.code).json({ error: message });
};

module.exports = isAdmin;