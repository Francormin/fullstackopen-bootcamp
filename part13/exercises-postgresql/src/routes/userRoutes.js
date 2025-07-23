const { Router } = require("express");
const { userControllers } = require("../controllers");
const { userFinder } = require("../middlewares");

const router = Router();

router.get("/", userControllers.getAll);
router.get("/:id", userFinder, userControllers.getById);
router.post("/", userControllers.create);
router.put("/:id", userFinder, userControllers.updateById);
router.delete("/:id", userFinder, userControllers.deleteById);

module.exports = router;
