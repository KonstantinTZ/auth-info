const { secret } = require("../config")
const jwt = require('jsonwebtoken')
module.exports = function (rolesArr) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({ message: "Пользователь не авторизован" })
            }
            const { roles: userRoles } = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if (rolesArr.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({ message: "У Вас нет доступа" })
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({ message: "Пользователь не авторизован" })
        }
    }
}