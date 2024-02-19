
const User = require('../modals/user')
const JWT = require("jsonwebtoken");
function Token(id) {
    return JWT.sign({ userId: id }, "deepak", { expiresIn: "1d" })
}
exports.register = async (req, res) => {
    try {
        console.log(req.body)

        const user = await User.create(req.body)
        return res.status(201).json({ msg: "user created sucessfully" })

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const { role, email, password } = req.body;
        const user = await User.findAll({ where: { email } })
        if (user[0].role !== req.body.role) {
            return res.status(500).json({
                success: false,
                message: "role doesn't match"
            })
        }
        if (user) {
            console.log("----------login--------------")
            if (user[0].password === password) {
                return res.status(200).json({ message: "login success", success: true, user: user[0], token: Token(user[0].id) })
            }
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } })
        return res.status(200).json({ success: true, data: user })

    } catch (err) {
        res.status(500).json(err)
    }
}