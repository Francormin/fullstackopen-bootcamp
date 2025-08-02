const { Blog, User } = require("../../models");
const { NotFoundError } = require("../errors");

const buildUserQueryOptions = (includeReadingList = false) => {
  if (!includeReadingList) return undefined;

  return {
    attributes: ["name", "username"],
    include: {
      model: Blog,
      as: "savedBlogs",
      through: {
        attributes: ["read", "id"],
        as: "readingList"
      },
      attributes: ["id", "url", "title", "author", "likes", "year"]
    }
  };
};

const findUserById = async (id, includeReadingList = false) => {
  const options = buildUserQueryOptions(includeReadingList);
  const user = await User.findByPk(id, options);
  if (!user) throw new NotFoundError("User not found");

  return user;
};

module.exports = { findUserById };
