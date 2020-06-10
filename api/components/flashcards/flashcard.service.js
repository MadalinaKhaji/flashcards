const pool = require('../../config/database');

const createFlashcard = (data, insertFlashcardTypeQuery, queryArgs) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.beginTransaction((err) => {
        if (err) {
          connection.rollback(() => {
            connection.release();
            return reject(err);
          });
        } else {
          connection.query(
            `INSERT INTO flashcards( Note, FormatType, SourceURL, DeckId) VALUES(?,?,?,?)`,
            [data.note, data.formatType, data.formatType === 'text' ? null : data.sourceURL, data.deckId],
            (err, results, fields) => {
              if (err) {
                connection.rollback(() => {
                  connection.release();
                  return reject(err);
                });
              } else {
                const flashcardId = results.insertId;
                // Assign the id of the newly created flashcard to the placeholder id
                queryArgs[0] = flashcardId;
                // Insert into either classic or fill in the blank flashcards table
                connection.query(insertFlashcardTypeQuery, queryArgs, (err, results, fields) => {
                  if (err) {
                    connection.rollback(() => {
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

                      connection.query(insertTagsQuery, [], (err, results, fields) => {
                        if (err) {
                          connection.rollback(() => {
                            connection.release();
                            return reject(err);
                          });
                        } else {
                          connection.commit((err) => {
                            if (err) {
                              connection.rollback(() => {
                                connection.release();
                                return reject(err);
                              });
                            } else {
                              connection.release();
                              resolve(results);
                            }
                          });
                        }
                      });
                    } else {
                      connection.commit((err) => {
                        if (err) {
                          connection.rollback(() => {
                            connection.release();
                            return reject(err);
                          });
                        } else {
                          connection.release();
                          resolve(results);
                        }
                      });
                    }
                  }
                });
              }
            }
          );
        }
      });
    });
  });
};

const getFlashcardById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM flashcards LEFT JOIN classic_flashcards ON flashcards.FlashcardId = classic_flashcards.FlashcardId LEFT JOIN fill_in_the_blank_flashcards ON flashcards.FlashcardId = fill_in_the_blank_flashcards.FlashcardId WHERE flashcards.FlashcardId = ?`,
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

const getFlashcardsByDeckId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT flashcards.FlashcardId, Note, Visibility, FormatType, SourceURL, SelfAssesmentScore, Difficulty, LastStudyDate, StudyInterval, Favorite, Front, Back, Context, Blank, DeckId FROM flashcards LEFT JOIN classic_flashcards ON flashcards.FlashcardId = classic_flashcards.FlashcardId LEFT JOIN fill_in_the_blank_flashcards ON flashcards.FlashcardId = fill_in_the_blank_flashcards.FlashcardId WHERE flashcards.DeckId = ?`,
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

const getFlashcardsByUserId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM flashcards, decks WHERE flashcards.DeckId = decks.DeckId AND decks.UserId = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
};

const updateFlashcardById = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE flashcards SET Note=?, Visibility=?, FormatType=?, SourceURL=?, SelfAssesmentScore=?, Favorite=?, Difficulty=?, LastStudyDate = ?, StudyInterval = ? WHERE FlashcardId = ?`,
      [
        data.note,
        data.visibility,
        data.formatType,
        data.sourceURL,
        data.selfAssesmentScore,
        data.favorite,
        data.difficulty,
        data.lastStudyDate,
        data.studyInterval,
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
  getFlashcardById: getFlashcardById,
  getFlashcardsByDeckId: getFlashcardsByDeckId,
  getFlashcardsByUserId: getFlashcardsByUserId,
  updateFlashcardById: updateFlashcardById,
  deleteFlashcardById: deleteFlashcardById,
};
