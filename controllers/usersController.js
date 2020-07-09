const { createUser } = require('../models/usersModel');

exports.postUser = (req, res, next) => {
  const { email, password } = req.body;
  return createUser(email, password)
    .then((newUser) => {
      res.status(201).send({ msg: 'user registered' });
    })
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const { email } = req.user;

  res.status(200).send({ msg: `User email: ${email}` });
};
