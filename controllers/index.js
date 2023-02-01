const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes');
const dshbrdRoutes = require('./dshbrd-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dshbrdRoutes);
router.use('/api', apiRoutes);

module.exports = router;