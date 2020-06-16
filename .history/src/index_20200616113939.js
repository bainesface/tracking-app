const express = require('express');
const app = express();
const { username, password } = require('../config');

console.log(username, password);

const mongoUri =
  'mongodb + srv://bainesface:Dreamcatcher45@cluster0-lcvvk.mongodb.net/<dbname>?retryWrites=true&w=majority';

app.get('/', (req, res) => {
  res.send('hiya');
});

app.listen(8080, () => {
  console.log('listening on port 8080');
});
