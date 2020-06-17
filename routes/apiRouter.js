const express = require('express');
const apiRouter = express.Router();
const authRouter = require('./authRouter');
const usersRouter = require('./usersRouter');
const { send405Error } = require('../errors');

apiRouter.use('/login', authRouter).all(send405Error);
apiRouter.use('/', usersRouter).all(send405Error);

module.exports = apiRouter;
