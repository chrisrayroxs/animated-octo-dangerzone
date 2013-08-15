exports.serve = function (req, res) {

	var http = require('http');

	res.render('root', {
		title:'Root of animated-octo-dangerzone.'
	});
}