const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');

exports.createUser = (email, password) => {
  return bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({ email: email, password: hashedPassword });
      return user.save();
    })
    .then((newUser) => {
      return newUser;
    });
};
