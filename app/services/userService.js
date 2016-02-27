var userStore        = require('../stores/userStore');
var authService      = require('./authService.js');
var userService = {};

//constant errorMsg
userService.PASSWORD_DONT_MATCH = "Password don't match";
userService.USERNAME_NOT_EXISTS = "Username don't exists";
userService.SERVER_ERROR = "Server error";


userService.loginUser = function( data ) {
  return new Promise( function(resolve, reject) {
    userStore.findUserByUsername(data.username)
      .then(function(user) {
        if( !user ) {
          reject({
              type: userService.USERNAME_NOT_EXISTS,
              message: "Incorrect username"
          });
        }
        else {
          user.comparePassword(data.password)
            .then( function(isMatch) {
              if( isMatch === false ) {
                reject({
                    type: userService.PASSWORD_DONT_MATCH,
                    message: "Password don't match"
                });
              }
              else {
                resolve({
                  username: user.username,
                  _id: user._id,
                  access_token: authService.createAccessToken(user._id),
                  refresh_token: authService.createRefreshToken(user._id)
                });
              }
            })
            .catch( function(error) {
              reject({
                type: userService.SERVER_ERROR,
                message: "Server error, try again later"
              });
            });
          }
      })
      .catch(function( errorFromUserSearch ) {
        reject({
          type: userService.USERNAME_NOT_EXISTS,
          message: 'User don\'t exists'
        });
      });
  });
};

userService.createUser = function(data) {
  userStore.saveUser()
  .then(function( userSaved ) {
    var newUser = {
      _id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      token: tokenLogic.createToken( userSaved._id )
    }
    return new Promise(function(resolve, reject) {
      resolve(newUser);
    });
  });

};

module.exports = userService;
