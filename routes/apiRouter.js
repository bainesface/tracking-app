const express = require('express');
const apiRouter = express.Router();
const usersRouter = require('./usersRouter');
const trackRouter = require('./trackRouter');
const { send405Error } = require('../errors');
const { sendToken } = require('../controllers/authController');

apiRouter.post('/login', sendToken).all(send405Error);

apiRouter.use('/', usersRouter).all(send405Error);

apiRouter.use('/tracks', trackRouter).all(send405Error);

module.exports = apiRouter;
