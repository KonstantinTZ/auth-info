const Router = require('express');
const router = new Router();
const controller = require('./authController')
const { check } = require('express-validator')
const authMiddlewere = require('./middlewere/authMidddlewere')
const roleMiddlewere = require('./middlewere/roleMiddlewere')

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "пароль должен быть длиннее 4 и короче 10 символов").isLength({ min: 4, max: 10 })
], controller.registration);
router.post('/login', controller.login)
router.get('/users', roleMiddlewere(['ADMIN']), controller.getUsers)

module.exports = router 