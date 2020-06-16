const { sendUser } = require('../models/authModel');

exports.postUser = (req, res, next) => {
  console.log('in auth controller');
  sendUser();
  res.send('you made a post request');
};

exports.getUser = (req, res, next) => {
  console.log('in auth controller');
  res.send('hiyaaaaa!');
};
