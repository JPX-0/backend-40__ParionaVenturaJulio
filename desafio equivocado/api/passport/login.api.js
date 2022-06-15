const bcrypt = require("bcrypt");
const Controller = require("../../controllers/index.controller");

const userController = new Controller().user;

const isValidPassowrd = async (user, password) => await bcrypt.compare(password, user.password);

const loginApi = async (userEmail, password, done) => {
  try {
    const user = await userController.getUser(userEmail);
    if(!await isValidPassowrd(user, password)) return done(null, false);
    return done(null, user);
  }
  catch(error) { done(null, false); }
}

module.exports = loginApi;