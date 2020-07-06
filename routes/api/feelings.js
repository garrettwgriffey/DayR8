const router = require("express").Router();
const db = require("../models/db");


router.route("/")
  .get(db.findAll)
  .post(db.create);


router
  .route("/:id")
  .get(db.findById)
  .put(db.update)
  .delete(db.remove);

module.exports = router;