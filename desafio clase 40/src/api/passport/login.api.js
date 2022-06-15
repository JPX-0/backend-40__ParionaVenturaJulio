const bcrypt = require("bcrypt");
const DAOFactory = require("../../models/daos/daos.factory");
// const UsersDao from "../../models/daos/Users.dao.js";

const userDao = DAOFactory().user;

const isValidPassowrd = async (user, password) => await bcrypt.compare(password, user.password);

const loginApi = async (userEmail, password, done) => {
  try {
    const user = await userDao.getByEmail(userEmail);
    if(!await isValidPassowrd(user, password)) return done(null, false);
    return done(null, user);
  }
  catch(error) { done(null, false); }
}

module.exports = loginApi;