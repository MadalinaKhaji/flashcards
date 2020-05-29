const pool = require('../../config/database');

const createDeck = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO decks(Name, Description, Subject, Favorite) VALUES(?,?,?,?)`,
      [data.name, data.description, data.subject, data.favorite],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};

const getDeckById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT DeckId, Name, Description, Subject, Favorite FROM decks WHERE DeckId = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results[0]);
      }
    );
  });
};

const updateDeckById = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE decks SET Name=?, Description=?, Subject=?, Favorite=? WHERE DeckId = ?`,
      [data.name, data.description, data.subject, data.favorite, data.deckId],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};

const deleteDeckById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM decks WHERE DeckId = ?`, [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  createDeck: createDeck,
  getDeckById: getDeckById,
  updateDeckById: updateDeckById,
  deleteDeckById: deleteDeckById,
};
