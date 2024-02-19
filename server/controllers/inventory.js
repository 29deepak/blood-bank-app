const User = require('../modals/user')
const Inventory = require('../modals/inventory')
const { Sequelize, Op } = require('sequelize');


exports.createInventory = async (req, res) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.status(404).json("user not found")
        }
        console.log("-------------------------step2-------------------------------")



        if (req.body.inventoryType === "out") {
            const totalInBloodGroup = await Inventory.findAll({
                attributes: [
                    'bloodGroup',
                    [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total']
                ],
                where: {
                    organisation: req.user.id,
                    inventoryType: "in",
                    bloodGroup: req.body.bloodGroup,
                },
                group: ['bloodGroup'],
            });
            console.log("------inventory--------", totalInBloodGroup[0].dataValues.total)
            const totalIn = totalInBloodGroup[0]?.dataValues?.total || 0
            console.log("totalin", totalIn)

            const totalOutBloodGroup = await Inventory.findAll({
                attributes: [
                    'bloodGroup',
                    [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total']
                ],
                where: {
                    organisation: req.user.id,
                    inventoryType: "out",
                    bloodGroup: req.body.bloodGroup,
                },
                group: ['bloodGroup'],
            });
            const totalOut = totalOutBloodGroup[0]?.dataValues?.total || 0
            console.log("totalOut", totalOut)
            const availableQuantityOfBloodGroup = totalIn - totalOut
            console.log("availa", availableQuantityOfBloodGroup)

            if (availableQuantityOfBloodGroup < req.body.quantity) {
                console.log("-----------------fbcdjf=-------")
                return res.status(500).json({
                    success: false,
                    message: `only ${availableQuantityOfBloodGroup} ML of ${req.body.bloodGroup}`
                })
            }
            req.body.hospital = user?.id
        } else {
            req.body.donar = user?.id;
        }
        console.log("----------------------------------------------------------------")




        console.log(req.body)

        const inventory = await Inventory.create(req.body)
        console.log(inventory)

        return res.status(201).json({
            success: true,
            message: "New Blood Record Added"
        })

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findAll({
            where: { organisation: req.user.id }, order: [
                ['createdAt', 'DESC']]
        }
        )
        return res.status(200).json({
            success: true,
            message: "get all records successfully",
            inventory
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getDonars = async (req, res) => {
    try {
        console.log("--------------------------------------donars---------------------------------------")
        const organisation = req.user.id;
        //find donars

        const donorId = await Inventory.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('donar')), 'donar']
            ],
            where: {
                organisation: organisation
            },

        });
        console.log(donorId)
        const donorIds = donorId.map(result => result.dataValues.donar);

        console.log(donorIds);
        const donars = await User.findAll({
            where: {
                // id: {
                //     [Sequelize.in]: donorById
                // }
                id: donorIds
            }
        });
        console.log("gfhvjbvfdjfvj", donars)
        return res.status(200).json({
            success: true,
            message: "donor record fetched",
            donars
        })


    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getHospitalsRecord = async (req, res) => {
    try {
        console.log("--------------------------------------hospitals---------------------------------------")
        const organisation = req.user.id;
        const hospitalId = await Inventory.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('hospital')), 'hospital']
            ],
            where: {
                organisation: organisation
            },

        });
        const hospitalIds = hospitalId.map(result => result.dataValues.hospital);

        console.log(hospitalIds);
        const hospitals = await User.findAll({
            where: {

                id: hospitalIds
            }
        });
        console.log("gfhvjbvfdjfvj", hospitals)
        return res.status(200).json({
            success: true,
            message: "hospital record fetched",
            hospitals
        })

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getOrganisationRecord = async (req, res) => {
    try {
        const donar = req.user.id;
        const orgId = await Inventory.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('organisation')), 'organisation']
            ],
            where: {
                donar: donar
            },

        });
        const orgIds = orgId.map(result => result.dataValues.organisation);

        console.log(orgIds);
        const organisations = await User.findAll({
            where: {

                id: orgIds
            }
        });
        console.log("gfhvjbvfdjfvj", organisations)
        return res.status(200).json({
            success: true,
            message: "organisations  record fetched",
            organisations
        })

    } catch (err) {
        return res.status(500).json(err)
    }
}


exports.organisationForHospitals = async (req, res) => {
    try {
        const hospital = req.user.id;
        const orgId = await Inventory.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('organisation')), 'organisation']
            ],
            where: {
                hospital: hospital
            },

        });
        const orgIds = orgId.map(result => result.dataValues.organisation);

        console.log(orgIds);
        const organisations = await User.findAll({
            where: {

                id: orgIds
            }
        });
        console.log("gfhvjbvfdjfvj", organisations)
        return res.status(200).json({
            success: true,
            message: "organisations hospital  record fetched",
            organisations
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getInventoryHospital = async (req, res) => {
    try {
        console.log("---------------inventory-hospital-----------------------------", req.body)
        let filters = req.body.filters
        const inventory = await Inventory.findAll({
            where: filters, order: [
                ['createdAt', 'DESC']]
        }
        )
        console.log(inventory)
        return res.status(200).json({
            success: true,
            message: "get hospital consumer record successfully",
            inventory
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}


exports.recentTransactionsInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findAll({
            organisation: req.user.id,
            limit: 3,
            order: [
                ['updatedAt', 'DESC']]

        })
        return res.status(200).json({
            success: true,
            message: "get recent activity ",
            inventory
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}