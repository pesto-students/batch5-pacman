import logger from '../../utils/logger';

const User = require('./model');

exports.greet = (req, res) => {
  res.send('Hi');
};

exports.save = (req, res) => {
  const user = {
    username: req.body.username,
    score: req.body.score,
    googleId: req.body.id,
    email: req.body.email,
  };
  User.create(user)
    .then(() => {
      res.send({ message: 'success', status: 201 });
    })
    .catch(() => logger('Error', 'creating user'));
};
