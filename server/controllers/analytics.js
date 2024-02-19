const User = require('../modals/user')
const Inventory = require('../modals/inventory')
const { Sequelize, Op } = require('sequelize');

exports.bloodGroupDetails = async (req, res) => {
    try {
        const bloodGroups = ['O+', "O-", "AB+", "AB-", "B+", "B-", "A+", "A-"];
        const bloodGroupData = []
        const organisation = req.user.id;

        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            const totalIn = await Inventory.findAll({
                attributes: [
                    'bloodGroup',
                    [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total']
                ],
                where: {
                    organisation: organisation,
                    inventoryType: "in",
                    bloodGroup: bloodGroup,
                },
                group: ['bloodGroup'],
            });
            const totalInBlood = totalIn[0]?.dataValues?.total || 0

            const totalOut = await Inventory.findAll({
                attributes: [
                    'bloodGroup',
                    [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total']
                ],
                where: {
                    organisation: organisation,
                    inventoryType: "out",
                    bloodGroup: bloodGroup,
                },
                group: ['bloodGroup'],
            });
            const totalOutBlood = totalOut[0]?.dataValues?.total || 0

            const availabeBlood = totalInBlood - totalOutBlood;
            bloodGroupData.push({
                bloodGroup,
                totalIn: totalInBlood,
                totalOut: totalOutBlood,
                availabeBlood
            })

        }))

        return res.status(200).json({
            success: true,
            message: "blood Group Data fetched Successfully",
            bloodGroupData
        })
    } catch (err) {
        return res.status(500).json(err)
    }
}