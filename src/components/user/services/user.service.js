'use strict';

const userModel = require('../models/user.model');

const getAllUsers = () => {
    return userModel.findAll();
};

const getUserByUserName = (username) => {
    return userModel.findOne({
        where: {
            username: username
        }
    })
}

const createNewUser = (user) => {
    return userModel.create(user);
}

module.exports = {
    getAllUsers,
    createNewUser,
    getUserByUserName
};