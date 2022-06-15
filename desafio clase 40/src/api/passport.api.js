const loginApi = require("./passport/login.api");
const registerApi = require("./passport/register.api");
const { deserializeApi, serializeApi } = require("./passport/serializer.api");

module.exports = { loginApi, registerApi, serializeApi, deserializeApi }