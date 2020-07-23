'use strict'; 

const orderModel = require('../models/order.model');
const orderProductModel = require('../models/orderProduct.model');
const { sequelizeInstance } = require('../../../config/database');

const getOrderById = (id, search) => {
    const query = `SELECT 
                    p.price, p.description, o.id,
                    o.status, o.payment, 
                    o.address, u.fullname,
                    u.username, u.email,
                    u.phone
                        FROM orders_products AS op
                        INNER JOIN orders AS o ON o.id = op.orderid
                        INNER JOIN products AS p ON p.id = op.productid
                        INNER JOIN users AS u ON u.id = o.userid
                        WHERE
                        o.id = ? ${search}`;
    
    return sequelizeInstance.query({query, values: [id]});
};

const getOrders = (search) => {
    const query = `SELECT 
                    p.price, p.description, o.id,
                    o.status, o.payment, 
                    o.address, u.fullname,
                    u.username, u.email,
                    u.phone
                        FROM orders_products AS op
                        INNER JOIN orders AS o ON o.id = op.orderid
                        INNER JOIN products AS p ON p.id = op.productid
                        INNER JOIN users AS u ON u.id = o.userid
                        ${search}`;
    
    return sequelizeInstance.query(query);
                    
}

const createOrder = (order) => {
    return orderModel.create(order);
};

const createOrderProduct = (orderProduct) => {
    return orderProductModel.create(orderProduct);
}; 

module.exports = {
    getOrderById,
    createOrder,
    createOrderProduct,
    getOrders
}