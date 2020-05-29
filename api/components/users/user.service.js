const pool = require('../../config/database');

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO users(FirstName, LastName, Username, Email, Password) VALUES(?,?,?,?,?)`,
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
    pool.query(`SELECT UserId, FirstName, LastName, Username, Email FROM users`, [], (error, results, fields) => {
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
      `SELECT UserId, FirstName, LastName, Username, Email FROM users WHERE UserId = ?`,
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

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  getUserByEmail: getUserByEmail,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
};
