const router = require("express").Router();
const feelingRoutes = require("./feelings.js");


router.use("/feelings", feelingRoutes);

module.exports = router;