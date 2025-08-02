const { ReadingList } = require("../../models");
const { BadRequestError } = require("../errors");

const checkIfBlogIsAlreadySaved = async (userId, blogId) => {
  const existing = await ReadingList.findOne({
    where: {
      user_id: userId,
      blog_id: blogId
    }
  });

  if (existing) throw new BadRequestError("Blog already exists in reading list");
};

module.exports = { checkIfBlogIsAlreadySaved };
