const router = require("express").Router();
const feelingRoutes = require("./feelings.js");
const passportRoutes = require("./auth.js")

router.use("/feelings", feelingRoutes);
router.use("/passport", passportRoutes);

module.exports = router;