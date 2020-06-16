const { createUser } = require('../models/authModel');

exports.postUser = (req, res, next) => {
  const { email, password } = req.body;
  createUser(email, password).then(() => {
    res.sendStatus(201);
  });
};
