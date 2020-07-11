'use strict';

const boom = require('@hapi/boom');

const validate = (data, schema) => {
    const { error } = schema.validate(data);
    return error; 
};

const validateSchema = (schema, check='body') => {
    return function (req, res, next) {
        let error = validate(req[check], schema);
        if (error) {
            error = boom.badRequest(error);
            error.status = error.output.statusCode;
            next(error);
        } else {
            next();
        }
    }
};

module.exports = { validateSchema };