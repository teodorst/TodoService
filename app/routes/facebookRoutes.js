var express    = require( 'express' );
var graph      = require( 'fbgraph' );
var jwt        = require('jsonwebtoken');
var tokenLogic = require('./tokenLogic');


module.exports = function(app) {   

    app.post('/facebookAuth', function(req, res) {
        graph.setAccessToken( req.body.facebookAccessToken );
        graph.get('/me', function(err, profile) {
            if( err ) {
                res.send({ 
                    status: 401, 
                    message: "Authentification failed"
                });
            }
            else {
                profile.token = tokenLogic.createToken(profile);
                res.status(200).send(profile);
            }
        });
    });
}


