'use strict';

const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../../../config/database');

const ProductModel = sequelizeInstance.define('products', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING(450)
    },
    price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9,2)
    },
    image: {
        allowNull: false,
        type: Sequelize.BLOB(450)
    },
}, {
    sequelizeInstance,
    modelName: 'products',
    timestamp: false
});

module.exports = ProductModel;