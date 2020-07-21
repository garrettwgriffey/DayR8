const router = require("express").Router();
const feelingsController = require("../../controllers/feelingsController");

router.route("/")
  .get(feelingsController.findAll)
  .post(feelingsController.create);

router
  .route("/:id")
  // .get(feelingsController.findById)
  .put(feelingsController.update)
  .delete(feelingsController.remove);

router
  .route("/month")
  .get(feelingsController.getBySpecificMonth)

module.exports = router;