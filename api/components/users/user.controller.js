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
          return res.status(201).send(results);
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
      return res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getSRSByUserId = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  userService.getSRSByUserId(req.params.id).then((results) => {
    if (!results) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).send(results);
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

const updateSRSByUserId = (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  // if (!req.body.SRS) {
  //   return res.status(400).json({ message: 'SRS is required' });
  // }

  userService
    .updateSRSByUserId(req.body)
    .then((results) => {
      return res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
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

      bcrypt.compare(req.body.password, results.Password, (err, result) => {
        if (result) {
          results.password = undefined;

          const jsontoken = jwt.sign({ result: results }, process.env.SECRET_KEY, {
            expiresIn: '1h',
            subject: results.UserId + '',
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

const createStudySession = (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: 'Request body is empty' });
  }

  if (!req.body.userId) {
    return res.status(400).json({ message: 'User id is required' });
  }

  if (!req.body.studySessionDate) {
    return res.status(400).json({ message: 'Session date is required' });
  }

  userService
    .createStudySession(req.body)
    .then((results) => {
      return res.status(201).send(results);
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).send('Error occurred..');
    });
};

const getStudySessionsByUserId = (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  userService
    .getStudySessionsByUserId(req.params.id)
    .then((results) => {
      if (!results) {
        return res.status(404).json({ message: 'Sessions not found' });
      }

      return res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);

      return res.status(500).send('Error occurred..');
    });
};

module.exports = {
  createUser: createUser,
  createStudySession: createStudySession,
  getUserById: getUserById,
  getSRSByUserId: getSRSByUserId,
  getStudySessionsByUserId: getStudySessionsByUserId,
  updateUserById: updateUserById,
  updateSRSByUserId: updateSRSByUserId,
  deleteUserById: deleteUserById,
  login: login,
};
