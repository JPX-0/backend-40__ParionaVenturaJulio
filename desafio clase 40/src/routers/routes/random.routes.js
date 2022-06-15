const express = require('express');
const { renderRandom } = require('../../controllers/websites.controller');

const router = express.Router();

//Routes
router.get('/random', renderRandom);
router.get('/random/:cantp', renderRandom);

module.exports = router;