const { Router } = require("express");
const readingListControllers = require("../controllers/readingListControllers");
const checkDuplicate = require("../middlewares/checkDuplicate");

const router = Router();

router.post("/", checkDuplicate, readingListControllers.addBlogToReadingList);

module.exports = router;
