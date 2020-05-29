const userController = require('./user.controller');

const express = require('express');

const router = express.Router();

const { validateToken } = require('../auth/auth.validator');

router.post('/', userController.createUser);

router.get('/', validateToken, userController.getAllUsers);

router.get('/:id', validateToken, userController.getUserById);

router.patch('/', validateToken, userController.updateUserById);

router.delete('/:id', validateToken, userController.deleteUserById);

router.post('/login', userController.login);

module.exports = router;
