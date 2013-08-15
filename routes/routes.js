//app routes setup

var index = require('../app/controllers/index'),
user = require('../app/controllers/user'),
dashboard = require('../app/controllers/dashboard'),
category = require('../app/controllers/category');

module.exports = function (app, auth) {

	//serve root, login, logout
	app.get('/', auth, root.serve);
	app.post('/', auth, index.login);
	app.get('/user', auth, user.serve);
	app.get('/login', auth, index.login);
	app.get('/logout', index.logout);

	
}