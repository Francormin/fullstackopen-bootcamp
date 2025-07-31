const { ReadingList } = require("../models");

const addBlogToReadingList = async (req, res) => {
  const { id, blogId, userId } = req.body;

  await ReadingList.create({
    id,
    blogId,
    userId
  });

  res.json({ message: "Blog added to reading list successfully" });
};

const readingListControllers = { addBlogToReadingList };

module.exports = readingListControllers;
