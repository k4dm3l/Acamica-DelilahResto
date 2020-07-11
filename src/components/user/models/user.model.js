'use strict';

const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../../../config/database');

const UserModel = sequelizeInstance.define('users', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED     
    },
    username: {
        allowNull: false,
        type: Sequelize.STRING(30)
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING(500)
    },
    rol: {
        allowNull: false,
        type: Sequelize.ENUM('ADMIN', 'USER')
    },
    fullname: {
        allowNull: false,
        type: Sequelize.STRING(350)
    },
    address: {
        allowNull: false,
        type: Sequelize.STRING(350)
    },
    phone: {
        allowNull: false,
        type: Sequelize.STRING(20)
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING(100)
    }
}, {
    sequelizeInstance,
    modelName: 'users',
    timestamp: false
});

module.exports = UserModel;