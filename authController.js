const User = require('./models/User')
const Role = require('./models/Role')

class authController {
    async registration(req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async getUsers(req, res) {
        try {
            const userRole = new Role()
            const userAdmin = new Role({ value: "ADMIN" })

            await userRole.save()
            await userAdmin.save()
            res.json("server works")
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController();