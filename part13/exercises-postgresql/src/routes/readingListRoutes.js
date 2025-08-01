const { Router } = require("express");
const readingListControllers = require("../controllers/readingListControllers");
const validateReadingListBody = require("../middlewares/validateReadingListBody");
const checkDuplicate = require("../middlewares/checkDuplicate");

const router = Router();

router.post(
  "/",
  validateReadingListBody,
  checkDuplicate,
  readingListControllers.addBlogToReadingList
);

module.exports = router;
