const { Blog } = require("../models");
const { validateIdParam } = require("../utils/validators");
const { NotFoundError } = require("../utils/errors");

const blogFinder = async (req, _res, next) => {
  validateIdParam(req.params.id);
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) throw new NotFoundError("Blog not found");
  next();
};

module.exports = { blogFinder };
