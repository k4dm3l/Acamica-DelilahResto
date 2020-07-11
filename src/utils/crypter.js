'use strict';

const bcrypt = require('bcrypt');

const config = require('../config/config');

const encryptPassword = async (plainPassword) => {
    const hashedPassword = await bcrypt.hash(plainPassword, Number(config.saltRounds));
    return hashedPassword;
};

const comparePasswords = async (incomingPassword, savedPassword) => {
    return await bcrypt.compare(incomingPassword, savedPassword);
}

module.exports = {
    encryptPassword,
    comparePasswords
};