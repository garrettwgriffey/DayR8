const db = require("../models");

// Defining methods for the Feelings Controller
module.exports = {
  createAccount: function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username, password);
    db.User.create({ username, password })
      .then((user) => {
        console.log(user);
        res.json(user);
      })
      .catch((err) => {
        res.status(401).json(err);
        console.log(err);
      });
  },
  logout: function (req, res) {
    req.logout();
    res.json("Logout");
  },
};
