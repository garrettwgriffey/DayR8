require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./models");
const app = express();
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 100000 },
  })
);
app.use(passport.initialize());

// app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// Requiring our routes
app.use(require("./routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// set port, listen for requests
const port = process.env.PORT || 5000;
db.sequelize.sync().then(function () {
  console.log("server");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
});
