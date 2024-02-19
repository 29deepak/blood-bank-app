const Sequelize = require('sequelize');

const sequelize = new Sequelize('blood-bank', 'root', 'Kunal@1234de', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;