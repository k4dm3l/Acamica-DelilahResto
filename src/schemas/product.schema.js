'use strict';

const joi = require('@hapi/joi');

const newProductSchema = joi.object().keys({
    description: joi.string().required(),
    price: joi.number().required(),
    image: joi.string().trim().required()
});

const updateProductSchema = joi.object().keys({
    id: joi.string().regex(/^[0-9]*$/).required()
});

module.exports = { newProductSchema, updateProductSchema };