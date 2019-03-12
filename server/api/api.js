const router = require('express').Router();

router.use('/users', require('./user/routes'));

module.exports = router;