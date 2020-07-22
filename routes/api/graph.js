const router = require("express").Router();
const graphController = require("../../controllers/graphController");

router.route("/week/:user")
    .get(graphController.getWeek)

router.route("/month/:user")
    .get(graphController.getMonth)

router.route("/year/:user")
    .get(graphController.getYear)

module.exports = router;