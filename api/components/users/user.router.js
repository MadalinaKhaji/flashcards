const userController = require('./user.controller');

const express = require('express');

const router = express.Router();

const { validateToken } = require('../auth/auth.validator');

router.post('/', userController.createUser);

// router.get('/', validateToken, userController.getUsers);
router.get('/', userController.getUsers);

router.get('/:id', validateToken, userController.getUserById);

router.patch('/', validateToken, userController.updateUser);

router.delete('/:id', validateToken, userController.deleteUserById);

router.post('/login', userController.login);

module.exports = router;
