require('dotenv').load();
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var refreshTokenStore = require('../stores/refreshTokenStore.js');


var authService = {};

//errors

authService.TOKEN_DIDNT_SAVE = "Token didn\'t saved";

//reimplemented
authService.createAccessToken = function ( userId ) {
  var token = jwt.sign(
    userId,
    process.env.SECRET,
    {
      expiresIn : 3600
    }
  );
  return token;
};

authService.createRefreshToken = function( userId ) {
  var refreshToken = randomstring(15);
  return new Promise(function(resolve, reject) {
    refreshToken.addPair(userId, refreshToken)
      .then(function(dbEntry) {
        resolve(refreshToken);
      })
      .catch( function(err) {
        reject(authService.TOKEN_DIDNT_SAVE);
      });
  });
}

authService.verifyToken = function(req, res, next) {
  // check for token in request
  var token = req.body.access_token || req.query.access_token || req.headers['x-access-token'];

  //decode token
  if( token ) {
    // verifies secret and check expiration Date
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if( err ) {
        return res.status(401).json({ message: 'Failed to authenticate token.' });
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
}

authService.refreshToken = function( data ) {
  return new Promise(function(resolve, reject) {
    refrestStore.findTokenEntry( data._id, data.refrestToken )
      .then(function() {
        var newPair = {
          userId: data._id,
          refreshToken: randomstring(15)
        };
        refrestToken.addRefreshTokenPair(newPair)
          .then( function( newDBEntry ) {
            newPair.access_token = authService.createAccessToken(newPair._id);
            resolve(newPair);
          })
          .catch( function( error ) {
            reject(error);
          });
      })
      .catch(function(error) {
        reject(error);
      });
  });

}

module.exports = authService;
