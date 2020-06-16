const express = require('express');
const apiRouter = express.Router();
const authRouter = require('./authRouter');

apiRouter.use('/signup', authRouter);

module.exports = apiRouter;
