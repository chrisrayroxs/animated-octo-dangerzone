exports.serve = function (req, res) {

	var http = require('http');

	res.render('pages/user', {
		title:'Root of animated-octo-dangerzone.'
	});
}
exports.login = function (req, res) {

	console.log('logging in');

	res.render('pages/user', {
		title:'Root of animated-octo-dangerzone.'
	});
}
exports.logout = function (req, res) {

	console.log('logging out');

	res.render('pages/user', {
		title:'Root of animated-octo-dangerzone.'
	});
}