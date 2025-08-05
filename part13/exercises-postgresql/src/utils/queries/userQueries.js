const { Blog, User } = require("../../models");
const { NotFoundError } = require("../errors");

const buildUserQueryOptions = (read, includeReadingList = false) => {
  if (!includeReadingList) return undefined;

  const throughOptions = {
    attributes: ["read", "id"],
    as: "readingList"
  };

  if (read !== undefined) {
    throughOptions.where = { read };
  }

  return {
    attributes: ["name", "username"],
    include: {
      model: Blog,
      as: "savedBlogs",
      through: throughOptions,
      attributes: ["id", "url", "title", "author", "likes", "year"]
    }
  };
};

const findUserById = async (id, read, includeReadingList = false) => {
  const options = buildUserQueryOptions(read, includeReadingList);
  const user = await User.findByPk(id, options);
  if (!user) throw new NotFoundError("User not found");

  return user;
};

module.exports = { findUserById };
