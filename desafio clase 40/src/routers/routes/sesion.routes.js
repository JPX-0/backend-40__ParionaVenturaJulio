const express = require('express');
const auth = require('../../middlewares/auth.middleware');
const { renderError, renderLogout } = require('../../controllers/sesion.controller');

const router = express.Router();

//Routes
router.get('/logout', auth, renderLogout);
router.get('/register-error',renderError);
router.get('/login-error', renderError);

module.exports = router;