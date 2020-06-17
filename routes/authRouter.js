const express = require('express');
const authRouter = express.Router();
const { sendToken } = require('../controllers/authController');
const { send405Error } = require('../errors');

authRouter.route('/').post(sendToken).all(send405Error);

module.exports = authRouter;
