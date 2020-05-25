const pool = require('../../config/database');

const createUser = (data, callback) => {
  pool.query(
    `INSERT INTO users(firstName, lastName, username, email, password) VALUES(?,?,?,?,?)`,
    [data.firstName, data.lastName, data.username, data.email, data.password],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const getUsers = (callback) => {
  pool.query(`SELECT id, firstName, lastName, username, email FROM users`, [], (error, results, fields) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const getUserById = (id, callback) => {
  pool.query(
    `SELECT id, firstName, lastName, username, email FROM users WHERE id = ?`,
    [id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    }
  );
};

const getUserByEmail = (email, callback) => {
  pool.query(`SELECT * FROM users WHERE email = ?`, [email], (error, results, fields) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results[0]);
  });
};

const updateUserById = (data, callback) => {
  pool.query(
    `UPDATE users SET firstName=?, lastName=?, username=?, email=? WHERE id = ?`,
    [data.firstName, data.lastName, data.username, data.email, data.id],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteUserById = (id, callback) => {
  pool.query(`DELETE FROM users WHERE id = ?`, [id], (error, results, fields) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

module.exports = {
  createUser: createUser,
  getUsers: getUsers,
  getUserById: getUserById,
  getUserByEmail: getUserByEmail,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
};
