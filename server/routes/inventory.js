const express = require('express')
const router = express.Router()
const inventoryController = require("../controllers/inventory")
const auth = require('../middleware/auth')
router.post('/create-inventory', auth, inventoryController.createInventory)
router.get('/get-inventory', auth, inventoryController.getInventory)
router.get("/get-donars", auth, inventoryController.getDonars)

router.get("/get-hospitals", auth, inventoryController.getHospitalsRecord)
router.get("/get-organisations", auth, inventoryController.getOrganisationRecord)

router.get("/get-organisationforHospitals", auth, inventoryController.organisationForHospitals)

router.post('/get-inventory-hospital', auth, inventoryController.getInventoryHospital)


router.get('/get-recent-activity', auth, inventoryController.recentTransactionsInventory)
module.exports = router