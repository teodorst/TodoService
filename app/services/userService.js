var userStore        = require('../stores/userStore');
var authService      = require('./authService.js');
var userService = {};

//constant errorMsg
userService.PASSWORD_DONT_MATCH = "Password don't match";
userService.USERNAME_NOT_EXISTS = "Username don't exists";
userService.SERVER_ERROR = "Server error";
userService.REFRESH_TOKEN_ERROR = "Refresh token error";


userService.loginUser = function( data ) {
  return new Promise( function(resolve, reject) {
    userStore.findUserByUsername(data.username)
      .then(function(user) {
        console.log(user);
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
                authService.createRefreshToken(user._id)
                  .then(function(refreshToken) {
                    resolve({
                      username: user.username,
                      _id: user._id,
                      access_token: 'Bearer ' + authService.createAccessToken(user._id),
                      refresh_token: refreshToken
                    });
                  })
                  .catch(function(error) {
                    console.log(erorr);
                    reject({
                      type: userService.REFRESH_TOKEN_ERROR,
                      message: 'Refresh token was not generated'
                    });
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
        console.log(errorFromUserSearch);
        reject({
          type: userService.USERNAME_NOT_EXISTS,
          message: 'User don\'t exists'
        });
      });
  });
};

userService.createUser = function(newUser) {
  return new Promise(function(resolve, reject) {

    userStore.saveUser(newUser)
      .then(function(userFromDB) {
        console.log('aici', authService.createRefreshToken);
        authService.createRefreshToken(userFromDB._id)
          .then(function(refreshToken) {
            resolve({
              username: userFromDB.username,
              _id: userFromDB._id,
              access_token: 'Bearer ' + authService.createAccessToken(userFromDB._id),
              refresh_token: refreshToken
            });
          })
          .catch(function(error) {
            console.log(error);
            reject({
              type: userService.REFRESH_TOKEN_ERROR,
              message: 'Refresh token was not generated'
            });
          });

      })
      .catch(function(error) {

        console.log(error)
        reject({
          type: userService.SERVER_ERROR,
          message: "User has not been created"
        });
      });
  });
};

module.exports = userService;
