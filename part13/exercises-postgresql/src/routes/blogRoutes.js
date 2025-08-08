const { Router } = require("express");
const { blogControllers } = require("../controllers");
const { blogFinder, validateParamId, sessionValidator } = require("../middlewares");

const router = Router();

router.get("/", blogControllers.getAll);
router.get("/:id", validateParamId, blogFinder, blogControllers.getById);
router.post("/", sessionValidator, blogControllers.create);
router.put("/:id", validateParamId, blogFinder, blogControllers.updateById);
router.delete("/:id", validateParamId, sessionValidator, blogFinder, blogControllers.deleteById);

module.exports = router;
