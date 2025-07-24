const { Blog } = require("../models");
const { NotFoundError } = require("../utils/errors");
const { validateParamId } = require("../utils/validators");

const blogFinder = async (req, _res, next) => {
  validateParamId(req.params.id);
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) throw new NotFoundError("Blog not found");
  next();
};

module.exports = blogFinder;
