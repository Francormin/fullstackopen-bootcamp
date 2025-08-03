const { Router } = require("express");
const { blogControllers } = require("../controllers");
const { blogFinder, tokenExtractor, validateParamId } = require("../middlewares");

const router = Router();

router.get("/", blogControllers.getAll);
router.get("/:id", validateParamId, blogFinder, blogControllers.getById);
router.post("/", tokenExtractor, blogControllers.create);
router.put("/:id", validateParamId, blogFinder, blogControllers.updateById);
router.delete("/:id", validateParamId, tokenExtractor, blogFinder, blogControllers.deleteById);

module.exports = router;
