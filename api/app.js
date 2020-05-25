const express = require('express');

const app = express();

const userRouter = require('./components/users/user.router');

app.use(express.json());

app.use('/api/users', userRouter);

module.exports = app;
