const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const app = express();

app.use(
  cors({
    origin(origin, cb) {
      const whitelist = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : [];
      cb(null, whitelist.includes(origin));
    },
    credentials: true
  })
);

app.use(compression());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back our index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});