
const express = require('express');
const isCompression = require('../../middlewares/compression.middleware');
const auth = require('../../middlewares/auth.middleware');
const { renderHome, renderInfo, renderLobby } = require('../../controllers/websites.controller');

const router = express.Router();

//Routes
router.get('/', renderLobby);
router.get('/home', auth, renderHome);
router.get("/info", isCompression, renderInfo);

module.exports = router;