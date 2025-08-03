const { findBlogByIdAndUser, findBlogById } = require("../utils/queries/blogQueries");

const blogFinder = async (req, _res, next) => {
  const blogId = req.params.id;

  req.blog = req.decodedToken?.id
    ? await findBlogByIdAndUser(blogId, req.decodedToken.id)
    : await findBlogById(blogId);

  next();
};

module.exports = blogFinder;
