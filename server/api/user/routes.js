const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.greet)

module.exports = router;