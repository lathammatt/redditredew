'use strict';

const passport = require('passport')
const { Strategy } = require('passport-local')
// const User = require('./models/user')

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
},
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { msg: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { msg: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
);