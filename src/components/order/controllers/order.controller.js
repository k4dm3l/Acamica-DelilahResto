'use strict';

const orderService = require('../services/order.service');
const productService = require('../../product/services/product.service');
const boom = require('@hapi/boom'); 

const searchOrder = async (req, res) => {
    const {id} = req.params;
    const [result, metadata] = await orderService.getOrderById(id);

    res.status(200).json({message: 'Success', data: result});
};

const createOrder = async (req, res) => {
    const { status, payment, address, total, productsid } = req.body;
    if(res.locals.rol !== 'ADMIN') throw boom.unauthorized('You are not allowed to perform this action');
    
    let validation = false;

    const promisesProductsOrders = [];
    const promiseProductValidation = [];

    productsid.forEach(product => {
        promiseProductValidation.push(productService.getProductByProductId(product));
    });

    const resultValidation = await Promise.all(promiseProductValidation);

    validation = resultValidation.find(r => {if (r === null) {return true}});

    if(validation === null) throw boom.badRequest(`Product  doesnt exist in database`);

    const createdOrder = await orderService.createOrder({status, payment, address, total});

    if(!createdOrder) throw boom.badImplementation('Error creating a new order.');

    productsid.forEach(id => {
        promisesProductsOrders.push(
            orderService.createOrderProduct({ productid: id, orderid: createdOrder.id })
        )
    });

    const resultPromises = await Promise.all(promisesProductsOrders);

    res.status(200).json({message: 'Success', data: createdOrder});
};

module.exports = {
    searchOrder,
    createOrder
}