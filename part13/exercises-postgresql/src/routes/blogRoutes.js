const { Router } = require("express");
const {
  getAll,
  getById,
  create,
  updateById,
  deleteById
} = require("../controllers/blogControllers");
const { blogFinder } = require("../middlewares");

const router = Router();

router.get("/", getAll);
router.get("/:id", blogFinder, getById);
router.post("/", create);
router.put("/:id", blogFinder, updateById);
router.delete("/:id", blogFinder, deleteById);

module.exports = router;
