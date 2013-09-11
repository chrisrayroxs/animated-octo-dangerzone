exports.serve = function (req, res) {

	var http = require('http');

	res.render('pages/root', {
		title:'Welcome!',
		content: {data:'some content'}
	});
}