const { findBlogInUserReadingList } = require("../utils/queries/readingListQueries");

const blogInReadingListFinder = async (req, _res, next) => {
  const blogId = req.params.id;

  req.blog = await findBlogInUserReadingList(req.decodedToken.id, blogId);
  next();
};

module.exports = blogInReadingListFinder;
