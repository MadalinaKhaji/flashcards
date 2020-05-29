const pool = require('../../config/database');

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users(firstName, lastName, username, email, password) VALUES(?,?,?,?,?)`,
      [data.firstName, data.lastName, data.username, data.email, data.password],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT id, firstName, lastName, username, email FROM users`, [], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id, firstName, lastName, username, email FROM users WHERE id = ?`,
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
    pool.query(`SELECT * FROM users WHERE email = ?`, [email], (error, results, fields) => {
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
      `UPDATE users SET firstName=?, lastName=?, username=?, email=? WHERE id = ?`,
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

const deleteUserById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM users WHERE id = ?`, [id], (error, results, fields) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  getUserByEmail: getUserByEmail,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
};
