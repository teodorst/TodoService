var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
var refreshTokenStore = require('../stores/refreshTokenStore.js');


var authService = {};

//errors

authService.TOKEN_DIDNT_SAVE = "Token didn\'t saved";

//reimplemented
authService.createAccessToken = function ( userId ) {
  console.log("UserId", typeof userId)
  var token = jwt.sign(
    { id: userId },
    process.env.SECRET,
    {
      expiresIn : '1h'
    }
  );
  return token;
};

authService.createRefreshToken = function( userId ) {
  console.log('Generating Refresh Token', typeof userId);
  var refreshToken = randomstring.generate(50);
  return new Promise(function(resolve, reject) {
    refreshTokenStore.addPair({ userId: userId, refresh_token: refreshToken})
      .then(function(dbEntry) {
        console.log('New Refresh from db', dbEntry);
        resolve(refreshToken);
      })
      .catch( function(err) {
        console.log(err);
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

authService.refreshToken = function( oldPair ) {
  console.log('incep procedura')
  return new Promise(function(resolve, reject) {
    refreshTokenStore.findRefreshTokenPair( oldPair )
      .then(function() {
        console.log(arguments)
        var newPair = {
          userId: oldPair.userId,
          refresh_token: randomstring.generate(50)
        };
        console.log('Urmeaza sa interschimb');
        refreshTokenStore.updateRefreshTokenPair(oldPair, newPair)
          .then( function() {
            newPair.access_token = 'Bearer ' + authService.createAccessToken(newPair.userId);
            console.log(newPair);
            resolve(newPair);
          })
          .catch( function( error ) {
            console.log(error);
            reject(error);
          });
      })
      .catch(function(error) {
        reject(error);
      });
  });
}


module.exports = authService;
