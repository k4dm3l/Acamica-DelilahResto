'use strict';

const router = require('express').Router();

const userRouter = require('./components/user/router');

router.use('/v1', userRouter);

module.exports = router;