const userController = require('./user.controller');

const express = require('express');

const router = express.Router();

const { validateToken } = require('../auth/auth.validator');

router.post('/', userController.createUser);

router.post('/sessions', validateToken, userController.createStudySession);

router.get('/:id', validateToken, userController.getUserById);

router.get('/settings/:id', validateToken, userController.getSRSByUserId);

router.get('/sessions/:id', validateToken, userController.getStudySessionsByUserId);

router.patch('/', validateToken, userController.updateUserById);

router.patch('/settings', validateToken, userController.updateSRSByUserId);

router.delete('/:id', validateToken, userController.deleteUserById);

router.post('/login', userController.login);

module.exports = router;
