const { ReadingList } = require("../models");
const { BadRequestError } = require("../utils/errors");

const checkDuplicate = async (req, _res, next) => {
  const { userId, blogId } = req.body;

  const existing = await ReadingList.findOne({
    where: {
      user_id: userId,
      blog_id: blogId
    }
  });

  if (existing) throw new BadRequestError("Blog already exists in reading list");
  next();
};

module.exports = checkDuplicate;
