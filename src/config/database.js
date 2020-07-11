'use strict';

const Sequelize = require('sequelize');
const config = require('./config');

const sequelizeInstance = new Sequelize(config.dbName, config.dbUsername, config.dbPassword, {
    host: config.dbHost,
    dialect: config.dbDialect,
    port: config.dbPort
});

module.exports = { sequelizeInstance };