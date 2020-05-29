const deckController = require('./deck.controller');

const express = require('express');

const router = express.Router();

const { validateToken } = require('../auth/auth.validator');

router.post('/', deckController.createDeck);

router.get('/:id', validateToken, deckController.getDeckById);

router.patch('/', validateToken, deckController.updateDeckById);

router.delete('/:id', validateToken, deckController.deleteDeckById);

module.exports = router;
