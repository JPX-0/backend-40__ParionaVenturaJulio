const bcrypt = require("bcrypt");
const Controller = require("../../controllers/index.controller");

const userController = new Controller().user;

const salt = async () => await bcrypt.genSalt(10);
const createHash = async (password) => await bcrypt.hash(password, await salt());

const registerApi = async (req, userEmail, password, done) => {
  try {
    const newUser = await userController.postData(req, userEmail, { password: await createHash(password) });
    return done(null, newUser);
  }
  catch (error) { done(null, false); }
}

module.exports = registerApi;