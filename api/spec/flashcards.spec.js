require('dotenv').config();

const axios = require('axios').default;

const baseURL = 'http://localhost:3000/api/flashcards';

describe('FLA API Flashcards', function () {
  it('should post classic flashcard using valid parameters', function (done) {
    axios
      .post(baseURL, {
        note: 'Included in next exam',
        formatType: 'text',
        sourceURL: '',
        deckId: 1,
        front: 'What year was the Notre Dame built?',
        back: '1163',
        tags: ['history', 'art', 'midterm'],
      })
      .then((response) => {
        expect(response.status).toEqual(201);
        done();
      });
  });

  it('should post classic flashcard using valid parameters and without tags', function (done) {
    axios
      .post(baseURL, {
        note: 'FFFFFFFy',
        formatType: 'text',
        sourceURL: '',
        deckId: 2,
        front: 'Whats good?',
        back: 'I dont know',
      })
      .then((response) => {
        expect(response.status).toEqual(201);
        done();
      });
  });

  it('should NOT post classic flashcard using invalid parameters', function (done) {
    axios
      .post(baseURL, {
        note: 'ImNotSupposedToBeHere',
        formatType: 'text',
        sourceURL: '',
        deckId: 2,
        front: 'Whats good?',
      })
      .then((results) => {
        // do nothing
      })
      .catch((error) => {
        expect(true).toBeTrue();
        done();
      });
  });

  it('should post fill in the blank flashcard using valid parameters', function (done) {
    axios
      .post(baseURL, {
        note: 'Some note',
        formatType: 'text',
        sourceURL: '',
        deckId: 2,
        context: 'The right to is blank',
        blank: 'left',
        tags: ['adawhy', 'litafawe', 'dafnessical art'],
      })
      .then((response) => {
        expect(response.status).toEqual(201);
        done();
      });
  }, 20000);

  it('should NOT post flashcard using invalid parameters', function (done) {
    axios
      .post(baseURL, {
        note: 'XXXXXXXX',
        visibility: true,
        formatType: 'text',
        sourceURL: '',
        favorite: false,
        deckId: 2,
        front: 'Whats good?',
        tags: ['philosophy', 'literature', 'classical art'],
      })
      .catch((error) => {
        expect(true).toBeTrue();
        done();
      });
  }, 20000);

  it('should get flashcards by deck id', function (done) {
    axios.get(`${baseURL}/deck/2`).then((response) => {
      expect(response.status).toEqual(200);
      done();
    });
  });
});
