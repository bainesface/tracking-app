const express = require('express');
const { validateToken } = require('../controllers/authController');
const trackRouter = express.Router();
const { getTrack, postTrack } = require('../controllers/trackContoller');
const { send405Error } = require('../errors');

trackRouter
  .route('/')
  .get(validateToken, getTrack)
  .post(validateToken, postTrack)
  .all(send405Error);

module.exports = trackRouter;
