const express = require('express')
const router = express.Router()
const analyticsController = require("../controllers/analytics")
const auth = require('../middleware/auth')

router.get("/blood-group-details", auth, analyticsController.bloodGroupDetails)

module.exports = router