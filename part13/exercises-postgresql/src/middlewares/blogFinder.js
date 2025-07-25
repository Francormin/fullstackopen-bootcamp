const { Blog } = require("../models");
const { NotFoundError, UnauthorizedError } = require("../utils/errors");
const { validateParamId } = require("../utils/validators");

const blogFinder = async (req, _res, next) => {
  validateParamId(req.params.id);

  if (req.decodedToken && req.decodedToken.id) {
    req.blog = await Blog.findOne({
      where: { id: req.params.id, userId: req.decodedToken.id }
    });
    if (!req.blog) throw new UnauthorizedError("You do not have permission to delete this blog");
  } else {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) throw new NotFoundError("Blog not found");
  }

  next();
};

module.exports = blogFinder;
