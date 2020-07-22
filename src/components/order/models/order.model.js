'use strict';

const Sequelize = require('sequelize');
const { sequelizeInstance } = require('../../../config/database');

const OrderModel = sequelizeInstance.define('orders', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
    },
    status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['NUEVO', 'CONFIRMADO', 'PREPARANDO', 'CANCELADO', 'ENVIANDO', 'ENTREGADO']
    },
    payment: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['EFECTIVO', 'TARJETA DE CREDITO']
    },
    address: {
        allowNull: false,
        type: Sequelize.STRING(450)
    },
    total: {
        allowNull: false,
        type: Sequelize.DECIMAL(9,2)
    }
}, {
    sequelizeInstance,
    modelName: 'orders',
    timestamp: false
});

module.exports = OrderModel;