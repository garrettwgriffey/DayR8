var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var db = require("../models");

passport.use(
  "local",
  new LocalStrategy(
    {
      // User signs in with a username and password
      username: "username",
    },
    function (username, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          username: username,
        },
      }).then(function (dbUser) {
        console.log("running findOne");
        // If there's no user with the given username
        if (!dbUser) {
          console.log("no user");
          return done(null, false, {
            message: "Incorrect Username!",
          });
        } else if (!dbUser.validPassword(password)) {
          console.log("incorrect password");
          return done(null, false, {
            message: "Incorrect Password!",
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

module.exports = passport;
