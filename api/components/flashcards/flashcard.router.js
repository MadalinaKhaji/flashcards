const flashcardController = require('./flashcard.controller');

const express = require('express');

const router = express.Router();

const { validateToken } = require('../auth/auth.validator');

router.post('/', validateToken, flashcardController.createFlashcard);

router.get('/:id', validateToken, flashcardController.getFlashcardById);

router.get('/deck/:id', validateToken, flashcardController.getFlashcardsByDeckId);

router.patch('/', validateToken, flashcardController.updateFlashcardById);

router.delete('/:id', validateToken, flashcardController.deleteFlashcardById);

module.exports = router;
