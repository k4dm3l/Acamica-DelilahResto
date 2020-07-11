'use strict';

/** Package Requirement */
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

/** File Requiremente */
const config = require('./config/config');
const { sequelizeInstance } = require('./config/database')
const { corsValidations } = require('./config/corsConfig');
const { notFoundHandler, logError, wrapErrors, errorHandlers } = require('./utils/middlewares/errorHandlers');

/** Server Init */
const server = express();

/** Middlewares */
server.use(morgan('dev'));
server.use(cors(corsValidations));
server.use(express.json());
server.use(compression());
server.use(helmet());

/** Routes */
server.use('/api', require('./router'));

/** Error Handlers */
server.use(notFoundHandler);

server.use(logError);
server.use(wrapErrors);
server.use(errorHandlers);

/** Functions */
const startServer = async () => {
    try {
        server.listen(config.port, () => console.log(`Server running on http://localhost:${config.port}`));
        await sequelizeInstance.authenticate();
        console.log('DB Connection succesfully established');
    } catch (error) {
        process.on('uncaughtException', () => console.log(error));
        process.on('unhandledRejection', () => console.log(error));
    }
};

module.exports = { startServer };