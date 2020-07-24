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

const updateStatusOrder = async (req, res) => {
    const {id, status} = req.query;

    if(res.locals.rol !== 'ADMIN') throw boom.unauthorized('You are not allowed to perform this action');

    const searchedOrder = await orderService.getOrderById(id, '');

    if(!searchedOrder.length) throw boom.notFound(`The order with id: ${id} does not exist`);

    const response = {
        id: id,
        status: searchedOrder[0][0].status,
        payment: searchedOrder[0][0].payment,
        address: searchedOrder[0][0].address,
        fullname: searchedOrder[0][0].fullname,
        username: searchedOrder[0][0].username,
        email: searchedOrder[0][0].email,
        phone: searchedOrder[0][0].phone,
        products: [],
        totalprice: 0
    };
    
    searchedOrder[0].forEach(product => {
        response.products.push({
            price: Number(product.price),
            description: product.description
        });
        response.totalprice += Number(product.price);
    });

    if(response.status === status) throw boom.badRequest(`Order ${id} already has status ${status}`);

    const [result, metadata] = await orderService.updateStatusOrder(id, status);

    if(result.affectedRows <= 0) throw boom.badImplementation(`Error trying to update order id ${id} with status ${status}`);
    
    res.status(201).json({message: 'Success', data: {
        id: id,
        status: status
    }});
};

const deleteOrderById = async (req, res) => {
    const {id} = req.params;
    
    if(res.locals.rol !== 'ADMIN') throw boom.unauthorized('You are not allowed to perform this action');

    const searchedOrder = await orderService.getOrderById(id, '');
    if(!searchedOrder[0].length) throw boom.notFound(`Order ${id} not found`);

    const orderedProducts = await orderService.deleteOrderProducts(id);
    if(!orderedProducts) throw boom.badImplementation('No products associated to this order');

    const deletedOrder = await orderService.deleteOrder(id);
    if(!deletedOrder) throw boom.badImplementation(`Delete process fail with order ${id}`);

    res.status(200).json({message: 'Success', data: `Order ${id} was succesfully deleted`});
};

module.exports = {
    searchOrder,
    createOrder,
    searchOrders,
    updateStatusOrder,
    deleteOrderById
}