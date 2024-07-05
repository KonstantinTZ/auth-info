const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require("./config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" }) // какую инфу хотим засекретить, сам секрет, сколько живет
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const { username, password } = req.body
            const candidate = await User.findOne({ username }) // патаемся найти иользователя
            if (candidate) {
                return res.status(400).json({ message: 'Пользователь с таким имененм уже существует' }) // если нашли => ошибка
            }
            const hashPassword = bcrypt.hashSync(password, 7); // хешируем пароль
            const userRole = await Role.findOne({ value: "USER" }) // присваиваем роль
            const user = new User({ username, password: hashPassword, roles: [userRole.value] }) // создаем юзера
            await user.save() // сохраняем
            return res.json({ message: 'Пользователь успешно зарегестрирован' }) // сообщение об успешности
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration failed' })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' }) // если НЕ нашли => ошибка
            }
            const validPassword = bcrypt.compareSync(password, user.password) // password из импута, user.password - то, что пришло и сравниваем
            if (!validPassword) {
                return res.status(400).json({ message: 'Пароль НЕ верен' }) // если НЕ верен пароль => ошибка
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({ token })// возвращаем этот токен на клиент
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Login failed' })
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController();