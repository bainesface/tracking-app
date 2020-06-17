const { createUser } = require('../models/usersModel');

exports.postUser = (req, res, next) => {
  const { email, password } = req.body;
  createUser(email, password)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const { email } = req.user;

  res.status(200).send({ msg: `User email: ${email}` });
};
