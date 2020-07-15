const router = require("express").Router();
const feelingRoutes = require("./feelings.js");
const passportRoutes = require("./auth.js")
const graphRoutes = require("./graph.js")

router.use("/feelings", feelingRoutes);
router.use("/passport", passportRoutes);
router.use("/graph", graphRoutes);

module.exports = router;