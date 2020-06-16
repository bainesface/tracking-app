const express = require('express');
const authRouter = express.Router();
const { postUser } = require('../controllers/authController');
const { send405Error } = require('../errors');

authRouter
  .route('/', () => {
    console.log('in auth router');
  })
  .post(postUser)
  .all(send405Error);

module.exports = authRouter;
