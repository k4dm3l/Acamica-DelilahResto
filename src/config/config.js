'use strict';

require('dotenv').config();

const config = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || '4000',
    corsDomain: process.env.CORS,
    dbDialect: process.env.DB_DIALECT,
    dbHost: process.env.BD_HOST,
    dbPort: process.env.DB_PORT,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.BD_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    saltRounds: process.env.SALT_ROUNDS,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiredTime: process.env.JWT_EXPIRE_TIME
};

module.exports = config;