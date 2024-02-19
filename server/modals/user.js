const Sequelize = require('sequelize');
const uuid = require('uuid')
const sequelize = require('../utils/database');
const User = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true

    },
    role: {
        type: Sequelize.ENUM('admin', 'orgnization', 'donar', 'hospital'),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true

    },
    organisationName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hospitalName: {
        type: Sequelize.STRING,
        allowNull: true
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    website: {
        type: Sequelize.STRING,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, {
    hooks: {
        beforeValidate: function (user, options) {
            // If the role is "user" or "admin", set allowNull to false
            if (user.role === 'user' || user.role === 'admin') {
                user.name.allowNull = false;
            }
            else if (user.role === "orgnization") {
                user.organisationName.allowNull = false
            }
            else if (user.role === "hospital") {
                user.hospitalName.allowNull = false
            }
        },
    },
}
);

module.exports = User;