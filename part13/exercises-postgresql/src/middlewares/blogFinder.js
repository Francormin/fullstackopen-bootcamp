const { validateParamId } = require("../utils/validators");
const { findBlogByIdAndUser, findBlogById } = require("../utils/queries/blogQueries");

const blogFinder = async (req, _res, next) => {
  validateParamId(req.params.id);
  const blogId = req.params.id;

  req.blog = req.decodedToken?.id
    ? await findBlogByIdAndUser(blogId, req.decodedToken.id)
    : await findBlogById(blogId);

  next();
};

module.exports = blogFinder;
