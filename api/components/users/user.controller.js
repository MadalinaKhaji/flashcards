const userService = require('./user.service');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.firstName) {
    return res.status(400).json({ message: 'First name is required' });
  }

  if (!req.body.lastName) {
    return res.status(400).json({ message: 'Last name is required' });
  }

  if (!req.body.username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      req.body.password = hash;

      userService
        .createUser(req.body)
        .then((results) => {
          return res.status(201).json({
            data: results,
          });
        })
        .catch((error) => {
          console.log(error);

          return res.status(500).json({
            message: 'Database connection error',
          });
        });
    });
  });
};

const getUserById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  userService
    .getUserById(req.params.id)
    .then((results) => {
      if (!results) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ data: results });
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAllUsers = (req, res) => {
  userService
    .getAllUsers()
    .then((results) => {
      return res.status(200).json({ data: results });
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateUserById = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.firstName) {
    return res.status(400).json({ message: 'First name is required' });
  }

  if (!req.body.lastName) {
    return res.status(400).json({ message: 'Last name is required' });
  }

  if (!req.body.username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!req.body.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      req.body.password = hash;

      userService
        .updateUserById(req.body)
        .then((results) => {
          if (!results) {
            return res.status(500).json({
              message: 'Failed to update user',
            });
          }

          return res.status(200).json({
            message: 'User updated succesfully',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
};

const deleteUserById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  userService
    .deleteUserById(req.params.id)
    .then((results) => {
      return res.status(200).json({ message: 'User deleted succesfully' });
    })
    .catch((error) => {
      console.log(error);
    });
};

const login = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  if (!req.body.password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  userService
    .getUserByEmail(req.body.email)
    .then((results) => {
      if (!results) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      bcrypt.compare(req.body.password, results.password, (err, result) => {
        if (result) {
          results.password = undefined;

          const jsontoken = jwt.sign({ result: results }, process.env.SECRET_KEY, {
            expiresIn: '1h',
          });

          return res.status(200).json({
            message: 'User login successful',
            token: jsontoken,
          });
        } else {
          return res.status(400).json({ message: 'Invalid email or password' });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  createUser: createUser,
  getUserById: getUserById,
  getAllUsers: getAllUsers,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
  login: login,
};
