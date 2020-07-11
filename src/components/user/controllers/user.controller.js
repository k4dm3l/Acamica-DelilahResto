'use strict'; 

const { encryptPassword, comparePasswords } = require('../../../utils/crypter');
const boom = require('@hapi/boom');
const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

const getUsers = async (req, res) => {
    const users = await userService.getAllUsers();

    if (!users.length) throw boom.notFound('No users in DataBase');
    res.status(200).json({ message: 'Success', data: users });
};

const authUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.getUserByUserName(username);

    if (!user.dataValues) throw boom.notFound(`User not found - ${username}`);
    const validation = await comparePasswords(password, user.password);

    if (!validation) throw boom.unauthorized('Bad credentials');

    const token = jwt.sign(user.dataValues, config.jwtSecret, { expiresIn: config.jwtExpiredTime });
    res.status(200).json( { message: 'Success', data: token });
};

const createUser = async (req, res) => {
    const user = req.body;
    let { password } = req.body;

    user.password = await encryptPassword(password);
    const createdUser = await userService.createNewUser(user);

    if (!createUser) throw boom.badImplementation('Error creating a new user. Contact support');

    res.status(200).json({message: 'Success', data: createdUser});
};

module.exports = { getUsers, createUser, authUser };