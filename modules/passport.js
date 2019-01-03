
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    // console.log('serialize');
    // console.log(user);
    return done(null, user._id);
  });
      
  passport.deserializeUser(function(_id, done) {
    // console.log('deserialize')
    User.findById(_id, function (err, user) {
      return done(err, user);
    });
  });
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        user.verifyPassword(password, function(err, isMatched) {
          if (!isMatched) {
            return done(null, false)
          }
          return done(null, user);
        }) 
      });
    }
  ));
}
