require('dotenv').load();
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');

var configure   = require('./configure.js');
var db          = require('./app/queries/todoStore.js');

var facebookRoutes  = require('./app/routes/facebookRoutes');
var todoRoutes      = require('./app/routes/todoRoutes');
var userRoutes;

var port = process.env.PORT || 8080;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// connect to db 

db.connect(process.env.DB_URL);


// configure cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


todoRoutes(app);


//facebookRoutes(app);



app.listen(port);

console.log('Magic happens at http://localhost:' + port);
