const express = require('express');
const authRouter = express.Router();
const { postUser, getUser } = require('../controllers/authController');

authRouter
  .route('/', () => {
    console.log('in auth router');
  })
  .get(getUser)
  .post(postUser);

module.exports = authRouter;
