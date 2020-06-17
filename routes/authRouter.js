const express = require('express');
const authRouter = express.Router();
const { sendToken } = require('../controllers/authController');
const { getUser } = require('../controllers/usersController');
const { send405Error } = require('../errors');

authRouter.route('/').post(sendToken).get(getUser).all(send405Error);

module.exports = authRouter;
