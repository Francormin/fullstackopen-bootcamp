const { ReadingList } = require("../models");

const addBlogToReadingList = async (req, res) => {
  const readingListEntry = await ReadingList.create(req.body);

  res.status(201).json({
    message: "Blog added to reading list successfully",
    readingListEntry
  });
};

const markBlogInReadingListAsRead = async (req, res) => {
  const { read } = req.body ?? {};

  req.blog.read = read ?? req.blog.read;
  await req.blog.save();

  res.json(req.blog);
};

const readingListControllers = {
  addBlogToReadingList,
  markBlogInReadingListAsRead
};

module.exports = readingListControllers;
