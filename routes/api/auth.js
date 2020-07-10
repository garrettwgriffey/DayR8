const router = require("express").Router();
const passportController = require("../../controllers/passportController");

router.route("/auth")
  .get(passportController.logout)
  .post(passportController.login)
    
router.route("/create")
  .post(passportController.createAccount)

module.exports = router;