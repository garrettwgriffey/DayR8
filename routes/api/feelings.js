const router = require("express").Router();
const feelingsController = require("../../controllers/feelingsController");

router.route("/:user")
  .get(feelingsController.findAll)
  .post(feelingsController.create);

router
  .route("/note/:id")
  // .get(feelingsController.findById)
  .put(feelingsController.update)
  .delete(feelingsController.remove);

router
  .route("/month/:month/:year/:user")
  .get(feelingsController.getBySpecificMonth)

router
  .route("/last/:user")
  .get(feelingsController.findLastEntry)
  
module.exports = router;