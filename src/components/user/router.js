'use strict';

const router = require('express').Router();


const { getUsers, createUser, authUser } = require('./controllers/user.controller');
const { catchWrapperFn } = require('../../utils/cathWrapper');
const { validateSchema } = require('../../utils/middlewares/validateSchema');
const { isLoggin } = require('../../utils/middlewares/tokenhandler');

const { newUserSchema, authUserSchema } = require('../../schemas/user.schema');

router.get('/user', isLoggin, catchWrapperFn(getUsers));
router.post('/auth', validateSchema(authUserSchema), catchWrapperFn(authUser));
router.post('/user', isLoggin, validateSchema(newUserSchema), catchWrapperFn(createUser));

module.exports = router;