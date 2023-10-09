const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done( { message: 'Incorrect username.' },false);

      User.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done( false, { message: 'Incorrect password.' });

        return done(null, user);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});