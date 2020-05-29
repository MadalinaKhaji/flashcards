const express = require('express');

const app = express();

const cors = require('cors');

const userRouter = require('./components/users/user.router');

const deckRouter = require('./components/decks/deck.router');

app.use(cors());

app.use(express.json());

app.use('/api/users', userRouter);

app.use('/api/decks', deckRouter);

module.exports = app;
