const router = require("express").Router();
const passportController = require("../../controllers/passportController");
const passport = require('../../config/passport');


router.route("/auth")
  .get(passportController.logout)
  .post(passport.authenticate('local'), (req, res) =>
  {console.log(req.body); res.json(req.user)})
    
router.route("/create")
  .post(passportController.createAccount)

module.exports = router;