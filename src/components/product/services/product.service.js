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

const updateProductById = (id, product) => {
    return productModel.update(product, {
        where: {
            id: id
        }
    });
};

const createNewProduct = (product) => {
    return productModel.create(product);
};

const deleteProduct = (id) => {
    return productModel.destroy({
        where: {
            id:id
        }
    });
};

module.exports = {
    getAllProducts,
    getProductByProductId,
    createNewProduct,
    updateProductById,
    deleteProduct
}