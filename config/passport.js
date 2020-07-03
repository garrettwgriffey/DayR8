// The code that implements passport. It searches the user table to find a matching user so that it can create a login event and/or session for that user. It is exported as passport which is an object that the server.js imports to add options into, such as their session duration. It is generated each time they login, and goes away when they logout or their session expires - Tim M.

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var db = require('../models')

passport.use('local', new LocalStrategy({
  // User signs in with a username and password
  username: 'username'
},
function (username, password, done) {
  // When a user tries to sign in this code runs
  db.User.findOne({
    where: {
      username: username
    }
  }).then(function (dbUser) {
    // If there's no user with the given username
    if (!dbUser) {
      return done(null, false, {
        message: 'Incorrect Username!'
      })
    } else if (!dbUser.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect Password!'
      })
    }
    // If none of the above, return the user
    return done(null, dbUser)
  })
}))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

module.exports = passport
