'use strict';

const productModel = require('../models/product.model');

const getAllProducts = () => {
    return productModel.findAll();
};

const getProductByProductId = (id) => {
    return productModel.findOne({
        where: {
            id: id
        }
    });
};

const createNewProduct = (product) => {
    return productModel.create(product);
}

module.exports = {
    getAllProducts,
    getProductByProductId,
    createNewProduct
}