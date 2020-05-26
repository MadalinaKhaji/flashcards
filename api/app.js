const express = require('express');

const app = express();

const cors = require('cors');

const userRouter = require('./components/users/user.router');

app.use(cors());

app.use(express.json());

app.use('/api/users', userRouter);

module.exports = app;
