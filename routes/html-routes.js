// Feel free to rewrite any routes in here, they are not real routes, they just give an idea of how to structure a new route to use the authentication offered by passport (user login is stored on the server during user session and is accessed to check authentication at various points in time as they trigger routes). You can also make static routes to explicitly serve a path without checking, but React-router covers that already - Tim M.
let db = require("../models")
var isAuthenticated = require('../config/authenticated')
require('dotenv').config()

module.exports = function (app) {
  // Renders the index page if logged in, else login page is loaded
  app.get('/', isAuthenticated, function (req, res) {
    res.send('cool beans')
  })

  // Sends the user to the login page, if they are logged in then sends them to the main page
  app.get('/login', isAuthenticated, function (req, res) {
    // If the user already has an account send them to the main page
    res.render('index')
  })

  // Renders the main page if user is authenticated, else login page is loaded
  app.get('/index', isAuthenticated, function (req, res) {
    res.render('index')
  })

  // Sends the user to the login page
  app.get('/login/static', isAuthenticated, function (req, res) {
    res.render('index')
  })

  // Renders the signup page
  app.get('/signup/static', function (req, res) {
    res.render('signup')
  })

  // The route to trigger push messages for users
  // app.post('/api/trigger-push-msg/', function (req, res) {
  //   const triggerPushMsg = function(subscription, dataToSend) {
  //     return webpush.sendNotification(subscription, dataToSend)
  //     .catch((err) => {
  //       if (err.statusCode === 404 || err.statusCode === 410) {
  //         console.log('Subscription has expired or is no longer valid: ', err);
  //         return deleteSubscriptionFromDatabase(subscription._id);
  //       } else {
  //         throw err;
  //       }
  //     });
  //   };
  //   return getSubscriptionsFromDatabase()
  //   .then(function(subscriptions) {
  //     let promiseChain = Promise.resolve();
  
  //     for (let i = 0; i < subscriptions.length; i++) {
  //       const subscription = subscriptions[i];
  //       promiseChain = promiseChain.then(() => {
  //         return triggerPushMsg(subscription, dataToSend);
  //       });
  //     }
  
  //     return promiseChain;
  //   })
  // })
  // Route to save the subscription of a user to push services
  app.post('/api/save-subscription/', function (req, res) {
    console.log(req.body)
    console.log("running post route for subscription")
    if (!req) {
      return;
    }
    return new Promise(function(resolve, reject) {
      db.Push.create({
        authorization: req.body
      }).then((newDoc, err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(newDoc._id);
      })
    })
  });
}
