const { Blog } = require("../models");

const blogFinder = async (req, _res, next) => {
  if (!req.params.id) {
    return next(new Error("Blog ID is required"));
  }
  if (isNaN(req.params.id)) {
    return next(new Error("Blog ID must be a number"));
  }
  if (req.params.id < 1) {
    return next(new Error("Blog ID must be a positive integer"));
  }

  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { blogFinder };
