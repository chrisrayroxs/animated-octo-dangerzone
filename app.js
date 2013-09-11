
//node/express configs - christopher_reynolds

//define core modules
var express = require('express'),
	http = require('http'),
	path = require('path');
	passport = require('passport'),
	mongoose = require( 'mongoose' );
	// database = require('./database').database;

//start chugging code
var app = express();
app.configure(function() {
	app.set('port', process.env.PORT || 8080);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon('public/images/ico/fav.ico'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

// var MongoStore = require('connect-mongo');

// app.use(express.session({
// 	secret: sess_conf.secret,
// 	maxAge: new Date(Date.now() + 3600000),
// 	store: new MongoStore(sess_conf.db)
// }));


// Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
	app.use(passport.initialize());
	app.use(passport.session());


// var mongoose = require('mongoose');

// db = mongoose.createConnection('localhost', 'animated-dangerzone');
// db.on('error', console.error.bind(console, 'connection error:'));


// var Schema = mongoose.Schema;

// var blogSchema = new Schema({
//   title:  String,
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });


//check if user has super basic authentication --to be changed later
// var auth = express.basicAuth(function(user, pass, callback) {
// 	var result = (user === 'user' && pass === 'pass');
// 	callback(null /* error */ , result);
// });
var auth = true;

//load routes
require('./routes/routes')(app, auth);

//create server
http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});