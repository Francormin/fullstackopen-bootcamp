const { Router } = require("express");
const readingListControllers = require("../controllers/readingListControllers");

const router = Router();

router.post("/", readingListControllers.addBlogToReadingList);

module.exports = router;
