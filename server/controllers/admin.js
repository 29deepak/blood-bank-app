const User = require('../modals/user')
const Inventory = require('../modals/inventory')
const { Sequelize, Op } = require('sequelize');


exports.getDonorList = async (req, res) => {
    try {
        const donorData = await User.findAll({
            where: { role: "donar" },
            order: [
                ['createdAt', 'DESC']]
        })
        return res.status(200).json({
            success: true,
            message: "Donor List fetched successfully",
            totalCount: donorData.length,
            donorData
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}




exports.getHospitalList = async (req, res) => {
    try {
        const hospitalData = await User.findAll({
            where: { role: "hospital" },
            order: [
                ['createdAt', 'DESC']]
        })
        return res.status(200).json({
            success: true,
            message: "Hospital List fetched successfully",
            totalCount: hospitalData.length,
            hospitalData
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}




exports.getOrgList = async (req, res) => {
    try {
        const orgData = await User.findAll({
            where: { role: 'orgnization' },
            order: [
                ['createdAt', 'DESC']]
        })
        return res.status(200).json({
            success: true,
            message: "Org List fetched successfully",
            totalCount: orgData.length,
            orgData
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deleteDonar = async (req, res) => {
    try {
        const id = req.params.id
        const deleteDonorUser = await User.destroy({
            where: {
                id: id,
                role: "donar"
            }
        })

        return res.status(200).json({
            success: true,
            message: "delete donor data successfully"
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deleteHospital = async (req, res) => {
    try {
        const id = req.params.id
        const deleteHospitalUser = await User.destroy({
            where: {
                id: id,
                role: "hospital"
            }
        })

        return res.status(200).json({
            success: true,
            message: "delete hospital data successfully"
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deleteOrg = async (req, res) => {
    try {
        const id = req.params.id
        console.log("fbv v", id)
        const deleteOrgUser = await User.destroy({
            where: {
                id: id,
                role: "orgnization"
            }
        })

        return res.status(200).json({
            success: true,
            message: "delete org data successfully"
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}