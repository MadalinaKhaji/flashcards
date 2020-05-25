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

  userService.getUserByEmail(req.body.email, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

    if (results) {
      // Possible security flaw..
      return res.status(409).json({ message: 'Email is already registered' });
    } else {
      const saltRounds = 10;

      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          req.body.password = hash;

          userService.createUser(req.body, (err, results) => {
            if (err) {
              console.log(err);

              return res.status(500).json({
                message: 'Database connection error',
              });
            }
            return res.status(200).json({
              data: results,
            });
          });
        });
      });
    }
  });
};

// Possible security flaw
const getUserById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  userService.getUserById(req.params.id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!results) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ data: results });
  });
};

// Possible security flaw..
const getUsers = (req, res) => {
  userService.getUsers((err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.status(200).json({ data: results });
  });
};

const updateUser = (req, res) => {
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

      userService.updateUserById(req.body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }

        if (!results) {
          return res.status(500).json({
            message: 'Failed to update user',
          });
        }

        return res.status(200).json({
          message: 'User updated succesfully',
        });
      });
    });
  });
};

const deleteUserById = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  userService.deleteUserById(req.params.id, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    return res.status(200).json({ message: 'User deleted succesfully' });
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

  userService.getUserByEmail(req.body.email, (err, results) => {
    if (err) {
      console.log(err);
      return;
    }

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
  });
};

module.exports = {
  createUser: createUser,
  getUserById: getUserById,
  getUsers: getUsers,
  updateUser: updateUser,
  deleteUserById: deleteUserById,
  login: login,
};
