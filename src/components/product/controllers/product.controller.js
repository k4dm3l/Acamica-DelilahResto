'use strict';

const productService = require('../services/product.service');
const boom = require('@hapi/boom');

const getProducts = async (req, res) => {
    const products = await productService.getAllProducts();

    if(!products.length) throw boom.notFound('No products in database');
    res.status(200).json({ message: 'Success', data: products});
};

const createProduct = async (req, res) => {
    const product = req.body;
    
    const createdProduct = await productService.createNewProduct(product);

    if(!createProduct) throw boom.badImplementation('Error crating a new product. Contact support');

    res.status(200).json({message: 'Success', data: createdProduct});
};

module.exports = { getProducts, createProduct };