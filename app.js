
//node/express configs - christopher_reynolds

//define core modules
var express = require('express'),
	http = require('http'),
	path = require('path');

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
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

//configure app for developement mode
app.configure('development', function() {
	app.use(express.errorHandler());
});

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