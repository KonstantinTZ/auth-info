const Router = require('express');
const router = new Router();
const controller = require('./authController')

router.post('/registration');
router.post('/login')
router.get('/users')

module.exports = router 