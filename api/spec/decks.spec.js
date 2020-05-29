require('dotenv').config();

const axios = require('axios').default;

const baseURL = 'http://localhost:3000/api/decks';

describe('MyApp API', function () {
  describe('Deck Service', function () {
    const deckService = require('../components/decks/deck.service');

    let testId;

    it('should insert a new deck row in the decks table', function (done) {
      let testData = {
        name: 'Testing Deck',
        description: 'A deck for testing',
        subject: 'Testing Techniques',
        favorite: false,
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

  describe('Deck Controller', function () {
    const deckController = require('../components/decks/deck.controller');

    xit('should create a new deck using valid parameters', function (done) {
      let testData = {
        name: 'Testing Deck',
        description: 'A deck for testing',
        subject: 'Testing Techniques',
        favorite: false,
      };

      let testReq = { method: 'POST', body: JSON.stringify(testData) };

      deckController.createDeck(testReq, null).then((result) => {
        expect(result).toBeTruthy();
        done();
      });
    });
  });

  describe('Deck Router', function () {
    // this is bad
    let testToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiVXNlcklkIjoxLCJGaXJzdE5hbWUiOiJUZXN0IiwiTGFzdE5hbWUiOiJUZXN0IiwiVXNlcm5hbWUiOiJ0ZXN0IiwiRW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsIlBhc3N3b3JkIjoiJDJiJDEwJEp3LldXR3ZRZFZtbG8uQ2lIZm1ycmVCQnFDTHFxZVBaMTVTVGJVa2FWODZLSW9GaGRodlZTIn0sImlhdCI6MTU5MDc4MzU3OSwiZXhwIjoxNTkwNzg3MTc5fQ.Cup1FLA-C7QvUEMHMvzgzTcYovOLu4nhXqyYtqEIO1U';
    let testId;

    it('should post deck with valid body params', function (done) {
      axios
        .post(baseURL, {
          name: 'Testing Deck',
          description: 'A deck for testing',
          subject: 'Testing Techniques',
          favorite: false,
        })
        .then((response) => {
          expect(response.status).toEqual(201);
          testId = response.data.data.insertId;
          done();
        });
    });

    it('should get deck with valid id and valid token', function (done) {
      axios.get(`${baseURL}/${testId}`, { headers: { Authorization: `Bearer ${testToken}` } }).then((response) => {
        expect(response.status).toBe(200);
        done();
      });
    });

    it('should update deck with valid id and valid token', function (done) {
      axios
        .patch(
          baseURL,
          {
            name: 'Testing Deck 1',
            description: 'A deck for testing',
            subject: 'Testing Techniques',
            favorite: true,
            id: testId,
          },
          { headers: { Authorization: `Bearer ${testToken}` } }
        )
        .then((response) => {
          expect(response.status).toBe(200);
          done();
        });
    });

    it('should delete deck with valid id and valid token', function (done) {
      axios.delete(`${baseURL}/${testId}`, { headers: { Authorization: `Bearer ${testToken}` } }).then((response) => {
        expect(response.status).toBe(200);
        done();
      });
    });
  });
});
