'use strict'; 

const orderModel = require('../models/order.model');
const orderProductModel = require('../models/orderProduct.model');
const { sequelizeInstance } = require('../../../config/database');

const getOrderById = (id) => {
    const query = `SELECT *
                    FROM orders
                    INNER JOIN orders_products ON orders.id = orderid
                    WHERE orders.id = ?`;
    
    return sequelizeInstance.query({query, values: [id]});
};

const createOrder = (order) => {
    return orderModel.create(order);
};

const createOrderProduct = (orderProduct) => {
    return orderProductModel.create(orderProduct);
}; 

module.exports = {
    getOrderById,
    createOrder,
    createOrderProduct
}