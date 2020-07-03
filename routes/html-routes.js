var isAuthenticated = require('../config/authenticated')
require('dotenv').config()
const Handlebars = require('handlebars')
Handlebars.registerPartial('card', '{{card}}')

module.exports = function (app) {
  // Renders the index page if logged in, else login page is loaded
  app.get('/', isAuthenticated, function (req, res) {
    res.render('index')
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

  // Renders the liked page
  app.get('/liked', isAuthenticated, function (req, res) {
    res.render('liked')
  })

  // Renders the favorites page
  app.get('/favorites', isAuthenticated, function (req, res) {
    res.render('favorites')
  })
}
