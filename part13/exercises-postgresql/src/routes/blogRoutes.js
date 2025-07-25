const { Router } = require("express");
const { blogControllers } = require("../controllers");
const { blogFinder, tokenExtractor } = require("../middlewares");

const router = Router();

router.get("/", blogControllers.getAll);
router.get("/:id", blogFinder, blogControllers.getById);
router.post("/", tokenExtractor, blogControllers.create);
router.put("/:id", blogFinder, blogControllers.updateById);
router.delete("/:id", tokenExtractor, blogFinder, blogControllers.deleteById);

module.exports = router;
