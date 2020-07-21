'use strict';

const router = require('express').Router();

const { getProducts, createProduct, updateProduct, searchProduct, deleteProduct } = require('./controllers/product.controller');
const { catchWrapperFn } = require('../../utils/cathWrapper');
const { isLoggin } = require('../../utils/middlewares/tokenhandler');
const { newProductSchema, updateProductSchema } = require('../../schemas/product.schema');
const { validateSchema } = require('../../utils/middlewares/validateSchema');

router.get('/product', isLoggin, catchWrapperFn(getProducts));
router.get('/product/:id', isLoggin, validateSchema(updateProductSchema, 'params'), catchWrapperFn(searchProduct));
router.post('/product', isLoggin, validateSchema(newProductSchema), catchWrapperFn(createProduct));
router.put('/product/:id', isLoggin, validateSchema(updateProductSchema, 'params'), validateSchema(newProductSchema), catchWrapperFn(updateProduct));
router.delete('/product/:id', isLoggin, validateSchema(updateProductSchema, 'params'), catchWrapperFn(deleteProduct));

module.exports = router;