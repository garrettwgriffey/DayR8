const router = require("express").Router();
const graphController = require("../../controllers/graphController");

router.route("/week")
    .get(graphController.getWeek)

router.route("/month")
    .get(graphController.getMonth)

router.route("/year")
    .get(graphController.getYear)

module.exports = router;