'use strict';

const productService = require('../services/product.service');
const boom = require('@hapi/boom');


const searchProduct = async (req, res) => {
    const {id} = req.params;
    const searchProductId = await productService.getProductByProductId(id);
    if(!searchProductId) throw boom.notFound(`Product ${id} not found`);

    res.status(201).json({message: 'Success', data: searchProductId});    
};

const getProducts = async (req, res) => {
    const products = await productService.getAllProducts();

    if(!products.length) throw boom.notFound('No products in database');
    res.status(200).json({ message: 'Success', data: products});
};

const createProduct = async (req, res) => {
    const product = req.body;
    if (res.locals.rol !== 'ADMIN') throw boom.unauthorized('You are not allowed to perform this action');
    const createdProduct = await productService.createNewProduct(product);

    if(!createdProduct) throw boom.badImplementation('Error creating a new product. Contact support');

    res.status(200).json({message: 'Success', data: createdProduct});
};

const updateProduct = async (req, res) => {
    const product = req.body;
    const {id} = req.params;
    if(res.locals.rol !== 'ADMIN') throw boom.unauthorized('You are not allowed to perform this action');
    const searchProduct = await productService.getProductByProductId(id);
    if(!searchProduct) throw boom.notFound(`Product ${id} not found`);

    const updatedProduct = await productService.updateProductById(id, product);
    if(!updatedProduct.length) throw boom.badImplementation('Error trying to update this product');
    res.status(201).json({message: 'Success', data: product});
};

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    if(res.locals.rol !== 'ADMIN') throw boom.unauthorized('You are not allowed to perform this action');
    const productDeleted = await productService.deleteProduct(id);
    if(!productDeleted) throw boom.notFound(`Product ${id} not found`);

    res.status(200).json({message: 'Product deleted succesfully'});    
}

module.exports = { 
    getProducts,
    createProduct,
    updateProduct,
    searchProduct,
    deleteProduct
};