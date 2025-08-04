const { Blog } = require("../../models");
const { NotFoundError, UnauthorizedError } = require("../errors");

const findBlogById = async id => {
  const blog = await Blog.findByPk(id);
  if (!blog) throw new NotFoundError("Blog not found");
  return blog;
};

const findBlogByIdAndUser = async (id, userId) => {
  const matchFound = await Blog.findOne({ where: { id, userId } });
  if (!matchFound) throw new UnauthorizedError("You are not authorized to access this resource");
  return matchFound;
};

module.exports = {
  findBlogById,
  findBlogByIdAndUser
};
