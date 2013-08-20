exports.serve = function (req, res) {

	var http = require('http');

	res.render('pages/user', {
		title:'Root of animated-octo-dangerzone.'
	});
}