const db = require("../models");
const passport = require('../config/passport');

// Defining methods for the Feelings Controller
module.exports = {
  createAccount: function (req, res) {
    let username = req.body.username;
    let password = req.body.password
    console.log(username, password)
    db.User.create({username, password})
      .then((res) => res.redirect(307, '/api/auth/login'))
      .catch((err) => res.status(401).json(err));
  },
  logout: function (req, res) {
    req.logout()
    res.redirect('/api/auth/login')
  }
};
