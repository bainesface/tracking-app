const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

exports.sendToken = (req, res, next) => {
  console.log('in send token');
  const { email, password } = req.body;

  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject({ status: 401, msg: 'email does not exist' });
      } else if (user.password !== password) {
        return Promise.reject({ status: 401, msg: 'invalid password' });
      } else {
        const token = jwt.sign({ userId: user.id }, 'MY_SECRET_KEY');
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
  console.log(authorization);
  const token = authorization.replace('Bearer ', '');
  console.log(token);
  jwt.verify(token, 'MY_SECRET_KEY', (error, res) => {
    if (error) {
      return res.status(401).send({ msg: 'You must be logged in' });
    } else next();
  });
};
