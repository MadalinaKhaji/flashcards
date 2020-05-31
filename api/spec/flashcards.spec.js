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
        tags: ['pfsfehy', 'lefature', 'csefe art'],
      })
      .then((response) => {
        expect(response.status).toEqual(201);
        done();
      });
  }, 20000);

  xit('should post fill in the blank flashcard using valid parameters', function (done) {
    axios
      .post(baseURL, {
        note: 'Some note',
        visibility: true,
        formatType: 'text',
        sourceURL: '',
        favorite: false,
        deckId: 1,
        context: 'The right to is blank',
        blank: 'left',
        tags: ['adawhy', 'litafawe', 'dafnessical art'],
      })
      .then((response) => {
        expect(response.status).toEqual(201);
        done();
      });
  }, 20000);

  xit('should NOT post flashcard using invalid parameters', function (done) {
    axios
      .post(baseURL, {
        note: 'XXXXXXXX',
        visibility: true,
        formatType: 'text',
        sourceURL: '',
        favorite: false,
        deckId: 1,
        front: 'Whats good?',
        tags: ['philosophy', 'literature', 'classical art'],
      })
      .catch((error) => {
        expect(true).toBeTrue();
        done();
      });
  }, 20000);

  xit('should get flashcards by deck id', function (done) {
    axios.get(`${baseURL}/decks/1`).then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});
