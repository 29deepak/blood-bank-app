const express = require('express')
const router = express.Router()
const userController = require("../controllers/user")
const auth = require('../middleware/auth')
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getCurrentUser', auth, userController.getCurrentUser)
module.exports = router