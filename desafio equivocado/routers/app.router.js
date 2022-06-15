const { Router } = require('express');
const errorMiddleware = require('../middlewares/error.middleware');
const Routes = require('./post/post.routes');

const router = Router();

// Routes
router.use('/auth', Routes.auth);
router.use('/data', Routes.product);
router.use('/data', Routes.message);
router.use('/data', Routes.user);
router.use('/session', Routes.session);

// Error middleware
router.use(errorMiddleware);

module.exports = router;