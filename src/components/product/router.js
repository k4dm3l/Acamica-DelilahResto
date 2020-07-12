'use strict';

const router = require('express').Router();

const { getProducts, createProduct } = require('./controllers/product.controller');
const { catchWrapperFn } = require('../../utils/cathWrapper');

router.get('/product', catchWrapperFn(getProducts));
router.post('/product', catchWrapperFn(createProduct));

module.exports = router;