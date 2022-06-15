const env = require('../../utils/config/env.config');
const args = require('../index');
const STATUS = require('../../utils/constants/api.constants');
const DAOFactory = require('../models/daos/daos.factory');

const productsDao = DAOFactory().product;

const getInfo = async (req, res) => {
  const os = require("os");
  res.render('info', { 
    inputArguments: JSON.stringify(args), 
    platformName: process.platform, 
    versionNode: process.version, 
    rss: process.memoryUsage().rss, 
    path: `"${process.argv[0]}"`,
    processId: process.pid, 
    projectFolder: `"${process.cwd()}"`,
    numOfProcessors: os.cpus().length
  });
}

const getHome = (req, res) => {
  res.render('home');
}

const getProducts = async (req, res) => {
  const { maxPrice, searchName } = req.query;
  const products = [await productsDao.getByPrice(maxPrice), await productsDao.getByName(searchName), await productsDao.getAll()]
  const value = maxPrice == undefined ? "1000" : maxPrice;
  const searchProducts = (maxPrice && products[0]) || (searchName && products[1]) || products[2];
  if(products) return res.render('products', { value, searchProducts });
}

const getDetails = async (req, res) => {
  const { idProduct } = req.params;
  const product = await productsDao.getById(idProduct);
  const message = `the ID: "${idProduct}" entered does not match any product in our database`
  if(!product) return res.status(STATUS.BAD_REQUEST.code).json(formatResponse(false, STATUS.BAD_REQUEST, message));
  res.render("detail", { product });
}

const getLogout = async (req, res) => {
  const user = req.user.email;
  req.logout();
  req.session.destroy(err => {
    if(err) res.clearCookie(env.SESSION_NAME);
    res.render("logout", { nombre: user });
  });
  res.clearCookie(env.SESSION_NAME);
}

const getError = (req, res, page) => {
  const message = `USER ERROR ${page == "register-error" ? "SIGNUP" : "LOGIN"}`;
  res.render('error-session', { title: page, message });
}

module.exports = {
  getHome,
  getProducts,
  getDetails,
  getLogout,
  getError,
  getInfo
}