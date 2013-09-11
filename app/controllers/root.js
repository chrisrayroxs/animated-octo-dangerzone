exports.serve = function (req, res) {

	// var  http = require('http');

	res.render('pages/root', {
		title:'Welcome!',
		content: {data:'some content'}
	});

	var mongoose = require( 'mongoose' ),
	Team = mongoose.model('Team');

	Team.create({
		Country : 'England',
		GroupName: 'D',
		CreatedOn: Date.now()
	}, function(err, team) {
		var strOutput;
		res.writeHead(200, {
			'Content-Type': 'text/plain'
		});
		if (err) {
			console.log(err);
			strOutput = 'Oh dear, we\'ve got an error';
		} else {
			console.log('Team created: ' + team);
			strOutput = team.Country + ' created in Group ' + team.GroupName + '\nat ' + team.CreatedOn;
		}
		res.write(strOutput);
		res.end();
	});

}

exports.post = function (req, res) {

 //    var data = JSON.stringify(req.body, null, '\t');

	// fs = require('fs');

	// fs.writeFile('category_config.js', data, function (err) {

	// 	if (err) return console.log(err);

	// 	console.log('File Saved.');

	// });

}