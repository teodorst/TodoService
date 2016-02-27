var userService     = require('../services/userService.js');

module.exports = function( app ) {

app.post('/api/users/login', function(req, res) {
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

  // refactorize soon
  app.post('/api/users', function(req, res) {
    UserStore.createUser(req.body)
      .then(function(newUser) {
        if( newUser ){
          console.log(newUser);
          res.status(200).json(newUser);
        }
        else {
          res.status(500).json({ message: "Server Error!"});
        }
      })
      .catch(function(err) {
        if(err) {
          console.log(err);
          res.status(405).json({ message: "User with this email already exists"});
        }
      });
  });


  app.post('/api/users/:id/resetPassword', function(req, req) {
    return ;
  });

  app.get('/api/users/:id', function(req, res) {
    userService.getUserInfo()
      .then(function( user ) {
        
      })
      .catch( function(err) {

      });
  });


}
