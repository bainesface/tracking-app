const express = require('express');
const { validateToken } = require('../controllers/authController');
const trackRouter = express.Router();
const { getTrack, postTrack } = require('../controllers/trackContoller');

trackRouter
  .route('/')
  .get(validateToken, getTrack)
  .post(validateToken, postTrack);

module.exports = trackRouter;
