'use strict';

const catchWrapperFn = (fn) => {
    return function(req, res, next) {
        return fn(req, res, next).catch(error => {
            if(error.isBoom) {
                res.status(!error.status ? error.output.statusCode : 500).json({
                    message: error.response ? error.response.data.description : error.message,
                    status: !error.status ? error.output.statusCode : 500,
                    stack: error.stack
                });
            } else {
                res.status(error.status || 500).json({
                    message: error.response ? error.response.data.description : error.message,
                    status: error.status || 500,
                    stack: error.stack
                });
            }
        });
    }
};

// const catchWrapperFn2 = (fn) => (req, res, next) => fn(req,res, next).catch(next);

module.exports = { catchWrapperFn };