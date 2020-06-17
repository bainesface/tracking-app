const express = require('express');
const usersRouter = express.Router();
const { postUser } = require('../controllers/usersController');
const { send405Error } = require('../errors');

usersRouter
  .route('/', () => {
    console.log('in users router');
  })
  .post(postUser)
  .all(send405Error);

module.exports = usersRouter;
