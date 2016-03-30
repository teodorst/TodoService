var User = require('../models/User.js');

var getTime = function(){
  return new Date().getTime();
}

var userStore = {};

userStore.findUserByEmail = function (userEmail) {
	console.log(userEmail);
  return User.findOne({ email: userEmail });
}

userStore.saveUser = function (newUser) {
	var currentTime = getTime();
  return new User({
		//mendatory data
		email: newUser.email,
		password: newUser.password,
    birthDate: newUser.birthdate,
    createOn: currentTime,
    lastModified: currentTime,

		//optional data
		firstName: newUser.firstname || "",
		lastName: newUser.lastname || "",
		profilePictureUrl: "http://dreamatico.com/data_images/kitten/kitten-1.jpg",
    })
    .save();
};

userStore.findUserById = function (id) {
	return User.findOne({ _id: id });
}

// edit account
userStore.updateUser = function (newUser) {

};

module.exports = userStore;
