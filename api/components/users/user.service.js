const pool = require('../../config/database');

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.beginTransaction((error) => {
        if (error) {
          connection.rollback(() => {
            connection.release();
            return reject(error);
          });
        } else {
          connection.query(
            `INSERT INTO users(FirstName, LastName, Username, Email, Password) VALUES(?,?,?,?,?)`,
            [data.firstName, data.lastName, data.username, data.email, data.password],
            (error, results, fields) => {
              if (error) {
                connection.rollback(() => {
                  connection.release();
                  return reject(error);
                });
              } else {
                const userId = results.insertId;

                connection.query(`INSERT into user_settings(UserId) VALUES(?)`, [userId], (error, results, fields) => {
                  if (error) {
                    connection.rollback(() => {
                      connection.release();
                      return reject(error);
                    });
                  } else {
                    connection.commit((error) => {
                      if (error) {
                        connection.rollback(() => {
                          connection.release();
                          return reject(error);
                        });
                      } else {
                        connection.release();
                        resolve(results);
                      }
                    });
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

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT users.UserId, FirstName, LastName, Username, Email, user_settings.SRS FROM users LEFT JOIN user_settings ON users.UserId = user_settings.UserId WHERE users.UserId = ?`,
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

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM users WHERE Email = ?`, [email], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

const getSRSByUserId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT UserId, SRS from user_settings WHERE UserId = ?`, [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results[0]);
    });
  });
};

const updateUserById = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `UPDATE users SET FirstName=?, LastName=?, Username=?, Email=? WHERE UserId = ?`,
      [data.firstName, data.lastName, data.username, data.email, data.id],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};

const updateSRSByUserId = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(`UPDATE user_settings SET SRS=? WHERE UserId = ?`, [data.SRS, data.id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM users WHERE UserId = ?`, [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const createStudySession = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO study_sessions(UserId, StudySessionDate, StudiedFlashcardsNo) VALUES(?,?,?)`,
      [data.userId, data.studySessionDate, data.studiedFlashcardsNo],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};

const getStudySessionsByUserId = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM study_sessions WHERE UserId = ?`, [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  createUser: createUser,
  createStudySession: createStudySession,
  getUserById: getUserById,
  getUserByEmail: getUserByEmail,
  getSRSByUserId: getSRSByUserId,
  getStudySessionsByUserId: getStudySessionsByUserId,
  updateUserById: updateUserById,
  updateSRSByUserId: updateSRSByUserId,
  deleteUserById: deleteUserById,
};
