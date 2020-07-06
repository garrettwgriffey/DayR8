const router = require("express").Router();
const dbRoutes = require("./db");


router.use("/db", dbRoutes);

module.exports = router;