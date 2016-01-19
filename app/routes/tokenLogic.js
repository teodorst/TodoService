require('dotenv').load();

var jwt = require('jsonwebtoken');

var tokenLogic = {};

tokenLogic.createToken = function (facebookAccessToken) {
    var token = jwt.sign(
        facebookAccessToken, 
        process.env.SECRET, 
        {
            expiresInMinutes: 1440 // expires in 24 hours
        }
    );
    return token;
}

tokenLogic.validateToken = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //decode 
    if( token ) {
        jwt.verify(
            token, 
            process.env.SECRET, 
            function(err, decoded) {
                if( err ) {
                    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });    
                } 
                else {
                    req.decoded = decoded;    
                    next();
                }
            }
        );
    }
    else {
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });    
    }
};

module.exports = tokenLogic; 