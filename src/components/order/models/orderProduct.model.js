'use strict';

const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../../../config/database');

const OrderProductModel = sequelizeInstance.define('orders_products', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
    },
    productid: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED 
    },
    orderid: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED 
    }
}, {
    sequelizeInstance,
    modelName: 'orders_products',
    timestamp: false
});

module.exports = OrderProductModel;