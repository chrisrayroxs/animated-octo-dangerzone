exports.serve = function (req, res) {

    console.log('testing here');
  
  // var  http = require('http');

  res.render('pages/login', {
    title:'Welcome!',
    content: {data:'some content'}
  });

  var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

  var FACEBOOK_APP_ID = '162073077327925',
    FACEBOOK_APP_SECRET = 'e7c224a77d94624019305bc849ce3ebf';

  passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: '/root'
    },
    function(accessToken, refreshToken, profile, done) {
    console.log('we made it');

      // User.findOrCreate('Christopher Reynolds', function(err, user) {
      //   if (err) { return done(err); }
      //   done(null, user);
      // });
    }
  ));


  
}