const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.createUser = (email, password) => {
  const user = new User({ email, password });
  return user.save();
};
