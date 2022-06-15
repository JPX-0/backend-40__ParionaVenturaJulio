const compression = require("compression");
const compressionApi = require("../api/compression.api");

const isCompression = (req, res, next) => {
  if(compressionApi) return [compression(), next()];
  next();
}

module.exports = isCompression;