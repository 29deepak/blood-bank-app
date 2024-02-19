const express = require('express')
const router = express.Router()
const authAdmin = require('../middleware/admin')
const adminController = require("../controllers/admin")

router.get('/get-donor-list', authAdmin, adminController.getDonorList)
router.get('/get-hospital-list', authAdmin, adminController.getHospitalList)
router.get('/get-org-list', authAdmin, adminController.getOrgList)

router.delete('/get-delete-donor/:id', authAdmin, adminController.deleteDonar)
router.delete('/get-delete-hospital/:id', authAdmin, adminController.deleteHospital)
router.delete('/get-delete-org/:id', authAdmin, adminController.deleteOrg)
module.exports = router