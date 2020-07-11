'use strict';

const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const config = require('../../config/config');

const isLoggin = (req, res, next) => {
    const token = req.headers.authorization;

    try {
        if (!token) throw boom.unauthorized('Must send the token to perform this action');
        if (!token.startsWith('Bearer')) throw boom.unauthorized('No Bearer token send it in the request');

        const decoded = jwt.verify(token.split(' ')[1], config.jwtSecret);
        res.locals = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    isLoggin
};