var express     = require('express');
var session     = require('express-session')

var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');

var nodemailer    = require('nodemailer');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt-nodejs');
var async         = require('async');
var crypto        = require('crypto');
var cookieParser  = require('cookie-parser');

var configure     = require('./configure.js');
var connectDB     = require('./app/stores/connectDB.js');

//api routes
var authRoutes    = require('./app/routes/authRoutes');
var todoRoutes    = require('./app/routes/todoRoutes');
var userRoutes    = require('./app/routes/userRoutes');

var port = process.env.PORT || 8080;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// use morgan to log requests to the console
app.use(morgan('dev'));

// connect to db
var dbInstance = connectDB();
dbInstance.on('error', function() {
      console.log("connection error");
      exit(1);
  });
dbInstance.once("open", function() {
    console.log("DB connection ................ OK ");
    authRoutes(app);
    todoRoutes(app);
    userRoutes(app);
});



app.listen(port);

console.log('Magic happens at http://localhost:' + port);
