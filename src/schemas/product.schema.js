'use strict';

const joi = require('@hapi/joi');

const newProductSchema = joi.object().keys({
    description: joi.string().required().required,
    price: joi.number().trim().required(),
    image: joi.string().trim.required()
});

module.exports = { newProductSchema };