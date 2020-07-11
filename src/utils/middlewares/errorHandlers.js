'use strict';

const config = require('../../config/config');
const boom = require('@hapi/boom');

const notFoundHandler = (req, res) => {
    const { output: { statusCode, payload } } = boom.notFound();
    res.status(statusCode).json(payload);
};

const withErrorStack = (error, stack) => {
    if (config.environment !== 'production') return { error, stack };
    return error;
};

const logError = (err, req, res, next) => {
  //  req.log.error(err);
    next(err);
};

const wrapErrors = (err, req, res, next) => {
    !err.isBoom ? next(boom.badImplementation(err)) : next(err);
};

const errorHandlers = (err, req, res, next) => {
    const { output: { statusCode, payload } } = err;
    res.status(statusCode).json(withErrorStack(payload, err.stack));
};

module.exports = {
    notFoundHandler,
    logError,
    wrapErrors,
    errorHandlers
};