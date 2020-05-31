const express = require('express');

const app = express();

const cors = require('cors');

const userRouter = require('./components/users/user.router');

const deckRouter = require('./components/decks/deck.router');

const flashcardsRouter = require('./components/flashcards/flashcard.router');

app.use(cors());

app.use(express.json());

app.use('/api/users', userRouter);

app.use('/api/decks', deckRouter);

app.use('/api/flashcards', flashcardsRouter);

module.exports = app; 
