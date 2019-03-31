import logger from '../../utils/logger';

const User = require('./model');

exports.greet = (req, res) => {
  res.send('Hi');
};

exports.save = (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.username,
    email: req.body.username,
  };
  User.create(user)
    .then(() => {
      res.send({ message: 'success', status: 201 });
    })
    .catch(() => logger('Error', 'creating user'));
};
