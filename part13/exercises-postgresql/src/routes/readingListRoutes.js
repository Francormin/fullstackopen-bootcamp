const { Router } = require("express");
const { readingListControllers } = require("../controllers");
const {
  validateReadingListBody,
  checkDuplicate,
  validateParamId,
  blogInReadingListFinder,
  sessionValidator
} = require("../middlewares");

const router = Router();

router.post(
  "/",
  validateReadingListBody,
  checkDuplicate,
  readingListControllers.addBlogToReadingList
);

router.patch(
  "/:id",
  validateParamId,
  sessionValidator,
  blogInReadingListFinder,
  readingListControllers.markBlogInReadingListAsRead
);

module.exports = router;
