'use strict';

const joi = require('@hapi/joi');

const newOrderSchema = joi.object().keys({
    status: joi.string().uppercase().trim().valid('NUEVO', 'CONFIRMADO', 'PREPARANDO', 'CANCELADO', 'ENVIANDO', 'ENTREGADO').required(),
    payment: joi.string().trim().valid('EFECTIVO', 'TARJETA DE CREDITO').required(),
    address: joi.string().required(),
    total: joi.number().precision(2).positive().required(),
    productsid: joi.array().items(joi.number().integer().positive())
});

const updateOrderSchema = joi.object().keys({
    id: joi.string().regex(/^[0-9]*$/).required()
});

const updateStatusOrderSchema = joi.object().keys({
    id: joi.string().regex(/^[0-9]*$/).required(),
    status: joi.string().uppercase().trim().valid('NUEVO', 'CONFIRMADO', 'PREPARANDO', 'CANCELADO', 'ENVIANDO', 'ENTREGADO').required()
});

module.exports = { newOrderSchema, updateOrderSchema, updateStatusOrderSchema };