'use strict';

const joi = require('@hapi/joi');

const newUserSchema = joi.object().keys({
    username: joi.string().trim().alphanum().required(),
    password: joi.string().required(),
    rol: joi.string().uppercase().trim().valid('ADMIN', 'USER').strict().required(),
    fullname: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().regex(/^[0-9]*$/).required(),
    email: joi.string().email().trim().required()
});

const authUserSchema = joi.object().keys({
    username: joi.string().trim().alphanum().required(),
    password: joi.string().required()
});

module.exports = { newUserSchema, authUserSchema };