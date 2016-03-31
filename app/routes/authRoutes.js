var userService = require('../services/userService.js');
var authService = require('../services/authService.js');

module.exports = function( app ) {

	// login user route
  app.post('/api/auth/login', function(req, res) {
  userService.loginUser(req.body)
    .then(function(data) {
      res.status(200).json(data);
    })
    .catch(function(error) {
      if( error.type === userService.USERNAME_NOT_EXISTS) {
        res.status(404).json({ message: error.message});
      }
      else
        if( error.type === userService.PASSWORD_DONT_MATCH) {
          res.status(401).json({ message: error.message});
        }
      else
        if ( error.type === userService.SERVER_ERROR ) {
        res.status(500).json(error);
      }
    });
  });

  app.post('/api/auth/refresh', function(req, res) {
    authService.refreshToken(req.body)
      .then(function( newTokensPair ) {
        res.status(200).json(newTokensPair);
      })
      .catch( function( error ) {
        if( error.type ) {
          res.status(500).json({ message: "Couldn't generate a new pair" });
        }
      });
  });
};
