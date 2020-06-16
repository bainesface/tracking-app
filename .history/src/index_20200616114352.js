const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { username, password } = require('../config');

const mongoUri = `mongodb + srv://${username}:${password}@cluster0-lcvvk.mongodb.net/<dbname>?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });

app.get('/', (req, res) => {
  res.send('hiya');
});

app.listen(8080, () => {
  console.log('listening on port 8080');
});
