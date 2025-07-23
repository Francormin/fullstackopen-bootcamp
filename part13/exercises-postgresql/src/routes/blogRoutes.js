const { Router } = require("express");
const { blogControllers } = require("../controllers");
const { blogFinder } = require("../middlewares");

const router = Router();

router.get("/", blogControllers.getAll);
router.get("/:id", blogFinder, blogControllers.getById);
router.post("/", blogControllers.create);
router.put("/:id", blogFinder, blogControllers.updateById);
router.delete("/:id", blogFinder, blogControllers.deleteById);

module.exports = router;
