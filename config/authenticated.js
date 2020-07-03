// req.user is what the server stores to verify that the users session is still ongoing (we establish this time period on the server.js passport session section). If it has timed out, or the user isn't logged in, we want to send them to the login page (we will need to work with how react renders this to send them there). We use this with our routes as an optional condition before the protected routes fire. - Tim M.

module.exports = function (req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {
      return next()
    }
    // If the user isn't logged in, redirect them to the login page
    res.render('login')
  }
  