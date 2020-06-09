require('dotenv').config();

const axios = require('axios').default;

const baseURL = 'http://localhost:3000/api/decks';

describe('FLA API Decks', function () {
  describe('Deck Service', function () {
    const deckService = require('../components/decks/deck.service');

    let testId;

    it('should insert a new deck row in the decks table', function (done) {
      let testData = {
        name: 'Testing Deck',
        description: 'A deck for testing',
        subject: 'Testing Techniques',
        userId: 3
      };

      deckService.createDeck(testData).then((result) => {
        expect(result.affectedRows).toEqual(1);
        testId = result.insertId;
        done();
      });
    });

    it('should select a deck using id', function (done) {
      deckService.getDeckById(testId).then((result) => {
        expect(result).toBeTruthy();
        done();
      });
    });

    it('should update a deck', function (done) {
      let testData = {
        name: 'Modified Deck',
        description: 'A deck for testing',
        subject: 'Updated Testing Techniques',
        favorite: true,
        deckId: testId,
      };

      deckService.updateDeckById(testData).then((result) => {
        expect(result.affectedRows).toEqual(1);
        done();
      });
    });

    it('should delete a deck using id', function (done) {
      deckService.deleteDeckById(testId).then((result) => {
        expect(result.affectedRows).toEqual(1);
        done();
      });
    });
  });
});
