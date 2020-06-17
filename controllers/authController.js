const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

exports.sendToken = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject({ status: 401, msg: 'email does not exist' });
      } else if (user.password !== password) {
        return Promise.reject({ status: 401, msg: 'invalid password' });
      } else {
        const token = jwt.sign({ userId: user.id }, secretKey);
        res.status(200).send({ token });
      }
    })
    .catch(next);
};

exports.validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ msg: 'You must be logged in' });
  }

  const token = authorization.split(' ')[1];

  jwt.verify(token, secretKey, async (error, payload) => {
    if (error) {
      return res.status(401).send({ msg: 'You must be logged in' });
    }
    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
