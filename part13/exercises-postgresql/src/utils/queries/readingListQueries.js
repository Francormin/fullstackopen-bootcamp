const { ReadingList } = require("../../models");
const { BadRequestError, UnauthorizedError } = require("../errors");

const checkIfBlogIsAlreadySaved = async (userId, blogId) => {
  const matchFound = await ReadingList.findOne({ where: { userId, blogId } });
  if (matchFound) throw new BadRequestError("Blog already exists in reading list");
};

const findBlogInUserReadingList = async (userId, blogId) => {
  const matchFound = await ReadingList.findOne({ where: { userId, blogId } });
  if (!matchFound) throw new UnauthorizedError("You are not authorized to access this resource");
  return matchFound;
};

module.exports = {
  checkIfBlogIsAlreadySaved,
  findBlogInUserReadingList
};
