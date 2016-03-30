var userService     	= require('../services/userService.js');
var authService				= require('../services/authService.js');
var refreshTokenStore = require('../stores/refreshTokenStore.js');

module.exports = function( app ) {

  // create User route
  app.post('/api/users', function(req, res) {
    userService.createUser(req.body)
      .then (function(newUser) {
        if( newUser ){
          res.status(200).json(newUser);
        }
        else {
          res.status(500).json({ message: "Server Error!"});
        }
      })
      .catch(function(error) {
        if(error.type === userService.SERVER_ERROR) {
          res.status(405).json({ message: error.message});
        }
      });
  });

	// reset password
  app.post('/api/users/:id/resetPassword', function(req, req) {
    return ;
  });

	// get user profile
  app.get('/api/users/:id', authService.verifyToken, function(req, res) {
		console.log(req.params.id);
    userService.getUserProfile(req.params.id)
      .then (function(user) {
				res.status(200).json(user);
      })
      .catch( function(err) {
        if( err.type === userService.USERNAME_NOT_EXISTS ) {
          res.status(401);
        }
      });
  });

	app.post('/api/users/:id/logout', authService.verifyToken, function(req, res){
		userService.logout(req.params.id, req.body.refresh_token)
			.then(function(data) {
				if (data.result.n >= 1) {
					res.status(200).json({message: "Logout successfully"});
				} else {
					res.status(403).json({message: "Logout failed"});
				}
			})
			.catch(function(err){
				res.status(403).json({message: "Logout failed"});
			});
	});

}
