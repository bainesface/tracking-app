const express = require('express');
const usersRouter = express.Router();
const { postUser, getUser } = require('../controllers/usersController');
const { send405Error } = require('../errors');
const { validateToken } = require('../controllers/authController');

usersRouter.route('/signup').post(postUser).all(send405Error);

usersRouter.route('/user').get(validateToken, getUser).all(send405Error);

module.exports = usersRouter;
