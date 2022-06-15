const bcrypt = require("bcrypt");
const DAOFactory = require("../../models/daos/daos.factory");
const CreateDTO = require("../../models/dtos/create.dto");
const { infoLogger } = require("../../utils/config/logger.config");
const renderMail = require("../../utils/config/mail.config");
const sendMail = require("../../utils/config/nodemailer.config");

const userDao = DAOFactory().user;

const salt = async () => await bcrypt.genSalt(10);
const createHash = async (password) => await bcrypt.hash(password, await salt());

const dataLocation = [
  { code: "(+51)", prefix: "pe", country: "Perú" },
  { code: "(+54)", prefix: "arg", country: "Argentina" },
  { code: "(+34)", prefix: "esp", country: "España" },
  { code: "(+57)", prefix: "co", country: "Colombia" }
];

const registerApi = async (req, userEmail, password, done) => {
  try {
    const { firstname, lastname, avatar, location, phone } = req.body;
    if(!firstname || !lastname || !avatar || location == "-" || !phone || isNaN(phone)) {
      infoLogger.warn({ message: "Unregistered user" });
      return done(null, false); 
    }
    const phoneParse = `${dataLocation.find(e => req.body.location.split(" ")[0].toLowerCase() == e.prefix).code} ${req.body.phone}`;
    const locationParse = dataLocation.find(e => req.body.location.split(" ")[0].toLowerCase() == e.prefix).country;
    const newUser = {
      avatar,
      email: userEmail,
      firstname,
      lastname,
      location: locationParse,
      phone: phoneParse,
      admin: userEmail.split(".")[0] == "admin" ? true : false,
      password: await createHash(password)
    }
    const user = await userDao.save(new CreateDTO(newUser));
    await renderMail(user._id, newUser);
    await sendMail("admin", `Nuevo registro`, user._id);
    return done(null, user);
  }
  catch (error) { done(null, false); }
}

module.exports = registerApi;