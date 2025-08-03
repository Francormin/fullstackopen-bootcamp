const { Router } = require("express");
const { userControllers } = require("../controllers");
const { userFinder, validateParamId } = require("../middlewares");

const router = Router();

router.get("/", userControllers.getAll);
router.get(
  "/:id",
  validateParamId,
  userFinder({ includeReadingList: true }),
  userControllers.getById
);
router.post("/", userControllers.create);
router.put("/:id", validateParamId, userFinder(), userControllers.updateById);
router.delete("/:id", validateParamId, userFinder(), userControllers.deleteById);

module.exports = router;
