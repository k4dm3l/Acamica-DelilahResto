'use strict';

const orderService = require('../services/order.service');
const productService = require('../../product/services/product.service');
const boom = require('@hapi/boom'); 
const { search } = require('../router');
const { response } = require('express');

const searchOrder = async (req, res) => {
    const {id} = req.params;
    let searchParams = '';

    if(res.locals.rol !== 'ADMIN') {
        searchParams = `AND u.id = ${res.locals.id}`;
    }

    const [result, metadata] = await orderService.getOrderById(id, searchParams);

    if (!result.length) throw boom.notFound(`There is no order with id ${id}`);

    const response = {
        id: id,
        status: result[0].status,
        payment: result[0].payment,
        address: result[0].address,
        fullname: result[0].fullname,
        username: result[0].username,
        email: result[0].email,
        phone: result[0].phone,
        products: [],
        totalprice: 0
    };
    
    result.forEach(product => {
        response.products.push({
            price: Number(product.price),
            description: product.description
        });
        response.totalprice += Number(product.price);
    });

    res.status(200).json({message: 'Success', data: response});
};

const searchOrders = async (req, res) => {
    let searchParams = '';

    if(res.locals.rol !== 'ADMIN') {
        searchParams = `WHERE u.id = ${res.locals.id}`;
    }

    const [result, metadata] = await orderService.getOrders(searchParams);

    if(!result.length) throw boom.notFound(`There is no orders associated with id: ${res.locals.id}`);

    const response = [];

    const actualOrder = '';

    result.forEach(order => {
        const responseObject = {};
        const findOrder = response.find(o => o.id === order.id);

        if(findOrder) {
            findOrder.products.push({
                price: Number(order.price),
                description: order.description
            });
        } else {
            responseObject.products = [];

            responseObject.status = order.status;
            responseObject.id = order.id;
            responseObject.payment = order.payment;
            responseObject.fullname = order.fullname;
            responseObject.address = order.address;
            responseObject.products.push({
                price: Number(order.price),
                description: order.description
            });

            response.push(responseObject);
        }
    });

    res.status(200).json({message: 'Success', data: response});
};

const createOrder = async (req, res) => {
    const { status, payment, address, total, productsid } = req.body;
    
    let validation = false;

    const promisesProductsOrders = [];
    const promiseProductValidation = [];

    productsid.forEach(product => {
        promiseProductValidation.push(productService.getProductByProductId(product));
    });

    const resultValidation = await Promise.all(promiseProductValidation);

    validation = resultValidation.find(r => {if (r === null) {return true}});

    if(validation === null) throw boom.badRequest(`Product  doesnt exist in database`);

    const createdOrder = await orderService.createOrder({
        status,
        payment,
        address,
        total,
        userid: res.locals.id
    });

    if(!createdOrder) throw boom.badImplementation('Error creating a new order.');

    productsid.forEach(id => {
        promisesProductsOrders.push(
            orderService.createOrderProduct({ productid: id, orderid: createdOrder.id })
        )
    });

    await Promise.all(promisesProductsOrders);

    res.status(200).json({message: 'Success', data: createdOrder});
};

module.exports = {
    searchOrder,
    createOrder,
    searchOrders
}