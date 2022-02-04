const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
// const dashboardRoutes = require()

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
router.get('*', function(req, res) {
    res.render('login');
})

module.exports = router;
