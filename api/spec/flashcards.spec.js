require('dotenv').config();

const axios = require('axios').default;

const baseURL = 'http://localhost:3000/api/flashcards';

describe('MyApp API Flashcards', function () {
  describe('Flashcard Service', function () {
    const flashcardService = require('./../components/flashcards/flashcard.service');

    xit('should create query', function () {
      let result = flashcardService.createFlashcardTags(1, ['lasd', 'isasd', 'measdsn']);

      expect(result).toBeFalsy();
    });

    xit('should create flashcard using transaction', function (done) {
      let data = {
        note: 'Transaction note',
        visibility: true,
        formatType: 'text',
        sourceURL: '',
        favorite: false,
        deckId: 1,
        front: 'What is commit?',
        back: 'Commit is a b.',
        tags: ['asd', 'wer'],
      };

      flashcardService.createFlashcardUsingTransaction(data).then((response) => {
        expect(response).toBe(1);
        done();
      });
    }, 10000);
  });

  it('should post classic flashcard using valid parameters', function (done) {
    axios
      .post(baseURL, {
        note: 'Some note',
        visibility: true,
        formatType: 'text',
        sourceURL: '',
        favorite: false,
        deckId: 1,
        front: 'Whats good?',
        back: 'I dont know',
        tags: ['philosophy', 'literature', 'classical art'],
      })
      .then((response) => {
        expect(response.status).toEqual(201);
        done();
      });
  }, 20000);
});
