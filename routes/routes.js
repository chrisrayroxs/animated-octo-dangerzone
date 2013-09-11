//app routes setup

var root = require('../app/controllers/root'),
user = require('../app/controllers/user'),
login = require('../app/controllers/login'),
logout = require('../app/controllers/logout'),
music = require('../app/controllers/music'),
calendar = require('../app/controllers/calendar'),
blog = require('../app/controllers/blog'),
db = require('../app/controllers/models/db');

module.exports = function (app, auth) {

	//serve root, login, logout
	app.get('/', auth, root.serve);
	app.get('/login', auth, login.serve);
	// app.post('/', auth, index.login);
	// app.get('/user', auth, user.serve);

	app.get('/logout', auth, logout.serve);

	//front suite
	// app.get('/postboard', auth, postboard.serve);
	app.get('/music', auth, music.serve);
	app.get('/calendar', auth, calendar.serve);
	app.get('/blog', auth, blog.serve);

	// Redirect the user to Facebook for authentication.  When complete,
	// Facebook will redirect the user back to the application at
	//     /auth/facebook/callback
	app.get('/auth/facebook', passport.authenticate('facebook'));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook', { successRedirect: '/',
											failureRedirect: '/login' }));
	
}