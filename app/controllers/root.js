exports.serve = function (req, res) {

	var http = require('http');

	res.render('pages/root', {
		title:'Welcome!'
	});
}

exports.post = function (req, res) {

    var data = JSON.stringify(req.body, null, '\t');

	fs = require('fs');

	fs.writeFile('category_config.js', data, function (err) {

		if (err) return console.log(err);

		console.log('File Saved.');

	});

}