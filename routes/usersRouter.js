const express = require('express');
const usersRouter = express.Router();
const { postUser, getUser } = require('../controllers/usersController');
const { send405Error } = require('../errors');
const { validateToken } = require('../controllers/authController');

usersRouter
  .route('/signup', () => {
    console.log('in users router');
  })
  .post(postUser)
  .all(send405Error);

usersRouter
  .route('/user', () => {
    console.log('in user base route');
  })
  .get(validateToken, getUser)
  .all(send405Error);

module.exports = usersRouter;
