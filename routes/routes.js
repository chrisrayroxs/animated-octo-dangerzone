//app routes setup

var root = require('../app/controllers/root'),
user = require('../app/controllers/user');

module.exports = function (app, auth) {

	//serve root, login, logout
	app.get('/', auth, root.serve);
	// app.post('/', auth, index.login);
	app.get('/user', auth, user.serve);
	// app.get('/login', auth, index.login);
	// app.get('/logout', index.logout);

	
}