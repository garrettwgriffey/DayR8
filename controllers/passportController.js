const db = require("../models");
const passport = require('../config/passport');

// Defining methods for the Feelings Controller
module.exports = {
  createAccount: function (req, res) {
    db.User.create({username: req.body.username,
        password: req.body.password})
      .then((res) => res.redirect(307, '/api/login'))
      .catch((err) => res.status(401).json(err));
  },
  login: function (req, res) {
    passport.authenticate('local', {failureFlash : true}), function (req, res) {res.json(req.user)}
  },
  logout: function (req, res) {
    req.logout()
    res.redirect('/login')
  }
};
