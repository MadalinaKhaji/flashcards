const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  let token = req.get('Authorization');

  if (token) {
    token = token.slice(7);

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(400).json({ message: 'Invalid token' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      message: 'Access denied -unauthorized user',
    });
  }
};

module.exports = {
  validateToken: validateToken,
};
