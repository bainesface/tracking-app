const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.createUser = (email, password) => {
  const user = new User({ email, password });
  return user.save();
};

exports.fetchUser = (userId) => {
  console.log(userId, 'id fetch');
  const user = User.findById(userId).then((user) => {
    console.log(user);
  });
};
