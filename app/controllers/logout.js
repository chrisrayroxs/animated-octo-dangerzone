exports.serve = function (req, res) {

	// var  http = require('http');

	res.render('pages/logout', {
		title:'You have been logged out.',
		content: {data:'some content'}
	});

	auth = false;
	
}
