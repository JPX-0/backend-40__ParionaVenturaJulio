const { Router } = require('express');
const Controller = require('../../controllers/index.controller');
const auth = require('../../middlewares/auth.middleware');
const isAdmin = require('../../middlewares/isAdmin.middleware');
const passport = require('../../middlewares/passport.middleware');

const router = Router();
class Routes {
  constructor() {
    this.productController = new Controller().product;
    this.messageController = new Controller().message;
    this.userController = new Controller().user;
		console.log("CLASS: PostRoutes");
  }

  get auth() {
    router.post('/login', passport.authenticate("login", { 
      failureRedirect: "/login-error",
      successRedirect: "/home"
    }));
    router.post('/register', passport.authenticate("register", { 
      failureRedirect: "/register-error",
      successRedirect: "/home"
    }));
    return router;
  }

  get product() {
    router.get(`/product/get`, this.productController.getData);
    router.get(`/product/get/:idProd`, this.productController.getData);
    router.post(`/product/post`, isAdmin, this.productController.postData);
    router.put(`/product/put/:idProd`, isAdmin, this.productController.putData);
    router.delete(`/product/delete/:idProd`, isAdmin, this.productController.deleteData);
    return router;
  }

  get message() {
    router.get(`/message/get`, auth, this.messageController.getData);
    router.get(`/message/get/:idUser`, auth, this.messageController.getData);
    router.post(`/message/post`, auth, this.messageController.postData);
    return router;
  }

  get user() {
    router.get(`/user/get`, this.userController.getData);
    router.get(`/user/get/:idProd`, this.userController.getData);
    return router;
  }

  get session() {
    // router.get('/logout', auth, renderLogout);
    // router.get('/register-error',renderError);
    // router.get('/login-error', renderError);
    return router;
  }
}

module.exports = new Routes();