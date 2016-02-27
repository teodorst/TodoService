var userService     = require('../services/userService.js');

module.exports = function( app ) {


  // refactorize soon
  app.post('/api/users', function(req, res) {
    userService.createUser(req.body)
      .then(function(newUser) {
        if( newUser ){
          console.log(newUser);
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


  app.post('/api/users/:id/resetPassword', function(req, req) {
    return ;
  });

  app.get('/api/users/:id', function(req, res) {
    userService.getUserInfo()
      .then(function( user ) {
        //if()
      })
      .catch( function(err) {
        if( error.type === userService.USERNAME_NOT_EXISTS ) {
          res.status(401)
        }
      });
  });


}
