const express = require('express');
const apiRouter = express.Router();
const authRouter = require('./authRouter');
const { send405Error } = require('../errors');

apiRouter.use('/signup', authRouter).all(send405Error);

module.exports = apiRouter;
