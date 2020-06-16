const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { username, password } = require('../config');
const apiRouter = require('../routes/apiRouter');

const mongoUri = `mongodb+srv://${username}:${password}@cluster0-lcvvk.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
  console.error('error connecting to mongo', err);
});

app.use(express.json());
app.use('/', apiRouter);

app.listen(8080, () => {
  console.log('listening on port 8080');
});

module.exports = app;
