'use strict';

const router = require('express').Router();

const userRouter = require('./components/user/router');
const productRouter = require('./components/product/router');

router.use('/v1', userRouter);
router.use('/v1', productRouter);

module.exports = router;