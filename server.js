const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const path = require("path");
const db = require('./models');
const app = express();
var session = require('express-session')
// Requiring passport as we've configured it
var passport = require('./config/passport')
const timeout = require('connect-timeout')

// Sets cors header to allow all server to server api requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Allows connection to JawsDB without timing out
function haltOnTimeout (req, res, next) {
  if (!req.timedout) next()
}
app.use(timeout(15000))
app.use(haltOnTimeout)


// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true, cookie: { maxAge: 100000 } }))
app.use(passport.initialize())
app.use(passport.session())

// Requiring our routes
require('./routes/html-routes.js')(app)

// If we run into cors issues we may need this later on, if we end up shipping and it's not necessary then we can delete it

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// We may not need this with the Github pipeline build method, we can get around to testing all functionality with removing it at some point before we are done. If something breaks during a Heroku build, try uncommenting this bit - Tim M.

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back our index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

// set port, listen for requests
const port = process.env.PORT || 8081;
db.sequelize.sync().then(function () {
  console.log("server")
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  })
})
