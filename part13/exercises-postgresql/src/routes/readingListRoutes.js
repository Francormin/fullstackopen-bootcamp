const { Router } = require("express");
const { readingListControllers } = require("../controllers");
const {
  validateReadingListBody,
  checkDuplicate,
  validateParamId,
  tokenExtractor,
  blogInReadingListFinder
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
  tokenExtractor,
  blogInReadingListFinder,
  readingListControllers.markBlogInReadingListAsRead
);

module.exports = router;
