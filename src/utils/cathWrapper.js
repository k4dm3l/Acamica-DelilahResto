'use strict';

const catchWrapperFn = (fn) => {
    return function(req, res, next) {
        return fn(req, res, next).catch(error => {
            res.status(error.status || 500).json({
                message: error.response ? error.response.data.description : error.message,
                status: error.status || 500,
                stack: error.stack
            });
        });
    }
};

// const catchWrapperFn2 = (fn) => (req, res, next) => fn(req,res, next).catch(next);

module.exports = { catchWrapperFn };