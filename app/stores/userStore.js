var User = require('../models/User.js');

var getTime = function(){
  return new Date().getTime();
}

var userStore = {};

userStore.findUserByUsername = function( username ) {
  return User.findOne({ username: username });
}

userStore.saveUser = function( newUser ) {
  return new User({
    username: userData.username,
    password: userData.password,
    email: userData.email,
    createOn: getTime(),
    lastModified: getTime(),
    })
    .save();
};

// edit account

module.exports = userStore;