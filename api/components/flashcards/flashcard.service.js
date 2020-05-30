const pool = require('../../config/database');

const createFlashcard = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO flashcards( Note, Visibility, FormatType, SourceURL, Favorite, DeckId) VALUES(?,?,?,?,?,?)`,
      [data.note, data.visibility, data.formatType, data.sourceURL, data.favorite, data.deckId],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};

const createClassicFlashcard = (id, front, back) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO classic_flashcards(FlashcardId, Front, Back) VALUES(?,?,?)`,
      [id, front, back],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};

const createFlashcardTags = (id, tags) => {
  return new Promise((resolve, reject) => {
    let insertTagsQuery = `INSERT INTO flashcard_tags(FlashcardId, Tag) VALUES`;

    for (let i = 0; i < tags.length; i++) {
      insertTagsQuery += ` (${id}, '${tags[i]}')`;

      if (i === tags.length - 1) {
        insertTagsQuery += ';';
      } else {
        insertTagsQuery += ',';
      }
    }

    pool.query(insertTagsQuery, [], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const createFlashcardUsingTransaction = (data) => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      connection.beginTransaction(function (err) {
        if (err) {
          connection.rollback(function () {
            connection.release();
            return reject(err);
          });
        } else {
          connection.query(
            `INSERT INTO flashcards( Note, Visibility, FormatType, SourceURL, Favorite, DeckId) VALUES(?,?,?,?,?,?)`,
            [data.note, data.visibility, data.formatType, data.sourceURL, data.favorite, data.deckId],
            (error, results, fields) => {
              if (err) {
                connection.rollback(function () {
                  connection.release();
                  return reject(err);
                });
              } else {
                let flashcardId = results.insertId;

                if (data.front && data.back) {
                  connection.query(
                    `INSERT INTO classic_flashcards(FlashcardId, Front, Back) VALUES(?,?,?)`,
                    [flashcardId, data.front, data.back],
                    (error, results, fields) => {
                      if (err) {
                        connection.rollback(function () {
                          connection.release();
                          return reject(err);
                        });
                      } else {
                        if (data.tags) {
                          let insertTagsQuery = `INSERT INTO flashcard_tags(FlashcardId, Tag) VALUES`;

                          for (let i = 0; i < data.tags.length; i++) {
                            insertTagsQuery += ` (${flashcardId}, '${data.tags[i]}')`;

                            if (i === data.tags.length - 1) {
                              insertTagsQuery += ';';
                            } else {
                              insertTagsQuery += ',';
                            }
                          }

                          connection.query(insertTagsQuery, [], (error, results, fields) => {
                            if (err) {
                              connection.rollback(function () {
                                connection.release();
                                return reject(err);
                              });
                            } else {
                              connection.commit(function (err) {
                                if (err) {
                                  connection.rollback(function () {
                                    connection.release();
                                    return reject(err);
                                  });
                                } else {
                                  connection.release();
                                  resolve(flashcardId);
                                }
                              });
                            }
                          });
                        }
                      }
                    }
                  );
                }
              }
            }
          );
        }
      });
    });
  });
};

const getFlashcardsByDeckId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT flashcards.FlashcardId, Note, Visibility, FormatType, SourceURL, SelfAssesment, Difficulty, LastReviewDate, ReviewInterval, Favorite, Front, Back, Context, Blank, Tag, DeckId FROM flashcards JOIN classic_flashcards ON flashcards.FlashcardId = classic_flashcards.FlashcardId LEFT JOIN fill_in_the_blank_flashcards ON flashcards.FlashcardId = fill_in_the_blank_flashcards.FlashcardId JOIN flashcard_tags ON flashcards.FlashcardId = flashcard_tags.FlashcardId WHERE flashcards.DeckId = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

const getFlashcardById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM flashcards WHERE flashcards.FlashcardId = ?`, [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results[0]);
    });
  });
};

const getClassicFlashcardById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM classic_flashcards WHERE classic_flashcards.FlashcardId = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        resolve(results[0]);
      }
    );
  });
};

const getFlashcardTagsById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM flashcard_tags WHERE flashcard_tags.FlashcardId = ?`, [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

const updateFlashcardById = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE flashcards SET Note=?, Visibility=?, FormatType=?, SourceURL=?, SelfAssesment=?, Favorite=? WHERE FlashcardId = ?`,
      [
        data.note,
        data.visibility,
        data.formatType,
        data.sourceURL,
        data.selfAssesment,
        data.favorite,
        data.flashcardId,
      ],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};

const deleteFlashcardById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM flashcards WHERE FlashcardId = ?`, [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  createFlashcard: createFlashcard,
  createClassicFlashcard: createClassicFlashcard,
  createFlashcardTags: createFlashcardTags,
  createFlashcardUsingTransaction: createFlashcardUsingTransaction,
  getFlashcardsByDeckId: getFlashcardsByDeckId,
  getFlashcardById: getFlashcardById,
  getClassicFlashcardById: getClassicFlashcardById,
  getFlashcardTagsById: getFlashcardTagsById,
  updateFlashcardById: updateFlashcardById,
  deleteFlashcardById: deleteFlashcardById,
};
