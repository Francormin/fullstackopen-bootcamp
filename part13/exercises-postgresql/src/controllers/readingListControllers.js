const { ReadingList } = require("../models");

const addBlogToReadingList = async (req, res) => {
  const readingListEntry = await ReadingList.create(req.body);

  res.status(201).json({
    message: "Blog added to reading list successfully",
    readingListEntry
  });
};

const readingListControllers = { addBlogToReadingList };

module.exports = readingListControllers;
