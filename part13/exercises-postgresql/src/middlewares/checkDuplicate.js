const { checkIfBlogIsAlreadySaved } = require("../utils/queries/readingListQueries");

const checkDuplicate = async (req, _res, next) => {
  await checkIfBlogIsAlreadySaved(req.body.userId, req.body.blogId);
  next();
};

module.exports = checkDuplicate;
