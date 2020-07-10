var isAuthenticated = require('../config/authenticated');
const db = require('../models');
require('dotenv').config();
const passport = require('../config/passport');

require('dotenv').config();


  module.exports = function (app) {
    // Route to check the login credentials
    app.post('/api/login', passport.authenticate('local', {failureFlash : true}), function (req, res) {
      res.json(req.user)
    })
    // Logs the user out to the login page
    app.get('/logout', function (req, res) {
      req.logout()
      res.redirect('/login')
    })
    // Route to create a user from the sign-up page
    app.post('/api/signup', function (req, res) {
      db.User.create({
        username: req.body.username,
        password: req.body.password
      })
        .then(function () {
          res.redirect(307, '/api/login')
        })
        .catch(function (err) {
          res.status(401).json(err)
        })
    })
  }

  

 

