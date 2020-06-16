require('./db/user');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiRouter = require('./routes/apiRouter');
const ENV = process.env.NODE_ENV || 'development';
const { customErrorHandler, mongoErrorHandler } = require('./errors');

let mongoUsername;
let mongoPassword;

if (!process.env.MONGODB_USERNAME && !process.env.MONGODB_PASSWORD) {
  const { username, password } = require('./config');
  mongoUsername = username;
  mongoPassword = password;
} else {
  mongoUsername = process.env.MONGODB_USERNAME;
  mongoPassword = process.env.MONGODB_PASSWORD;
}

let mongoUri;

ENV === 'test'
  ? (mongoUri = 'mongodb://localhost:27017/test')
  : (mongoUri = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0-1ez75.mongodb.net/test?retryWrites=true&w=majority`);

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('error connecting to mongo', err);
});

app.use(express.json());
app.use('/', apiRouter);

app.use(customErrorHandler);
app.use(mongoErrorHandler);

module.exports = app;
