const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const Inventory = sequelize.define('inventory', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true

    },

    inventoryType: {
        type: Sequelize.ENUM('in', 'out'),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bloodGroup: {
        type: Sequelize.ENUM('O+', "O-", "AB+", "AB-", "B+", "B-", "A+", "A-"),
        allowNull: false
    },
    quantity: {
        type: Sequelize.NUMERIC,
        allowNull: false
    },


}
);

module.exports = Inventory;