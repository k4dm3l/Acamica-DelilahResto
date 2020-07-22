'use strict';

const router = require('express').Router();

const userRouter = require('./components/user/router');
const productRouter = require('./components/product/router');
const orderRouter = require('./components/order/router');

router.use('/v1', userRouter);
router.use('/v1', productRouter);
router.use('/v1', orderRouter);

module.exports = router;