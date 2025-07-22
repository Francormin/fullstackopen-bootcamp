const { Blog } = require("../models");

const getAll = async (_req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getById = async (req, res) => {
  return !req.blog ? res.status(404).end() : res.json(req.blog);
};

const create = async (req, res) => {
  if (!req.body?.url || !req.body?.title) {
    return res.status(400).json({ error: "URL and title are required" });
  }
  if (typeof req.body?.url !== "string" || typeof req.body?.title !== "string") {
    return res.status(400).json({ error: "URL and title must be strings" });
  }
  if (req.body?.likes && typeof req.body.likes !== "number") {
    return res.status(400).json({ error: "Likes must be a number" });
  }
  if (req.body?.likes && req.body.likes < 0) {
    return res.status(400).json({ error: "Likes cannot be negative" });
  }
  if (req.body?.author && typeof req.body.author !== "string") {
    return res.status(400).json({ error: "Author must be a string" });
  }

  try {
    const newBlog = await Blog.create({
      author: req.body?.author || "",
      url: req.body?.url,
      title: req.body?.title,
      likes: req.body?.likes
    });

    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error creating blog: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateById = async (req, res) => {
  if (req.body?.url && typeof req.body.url !== "string") {
    return res.status(400).json({ error: "URL must be a string" });
  }
  if (req.body?.title && typeof req.body.title !== "string") {
    return res.status(400).json({ error: "Title must be a string" });
  }
  if (req.body?.likes && typeof req.body.likes !== "number") {
    return res.status(400).json({ error: "Likes must be a number" });
  }
  if (req.body?.likes && req.body.likes < 0) {
    return res.status(400).json({ error: "Likes cannot be negative" });
  }
  if (req.body?.author && typeof req.body.author !== "string") {
    return res.status(400).json({ error: "Author must be a string" });
  }

  try {
    if (!req.blog) {
      return res.status(404).end();
    }

    req.blog.author = req.body?.author || req.blog.author;
    req.blog.url = req.body?.url || req.blog.url;
    req.blog.title = req.body?.title || req.blog.title;
    req.blog.likes = req.body?.likes || req.blog.likes;
    await req.blog.save();

    res.json(req.blog);
  } catch (error) {
    console.error("Error updating blog by ID: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteById = async (req, res) => {
  try {
    if (!req.blog) {
      return res.status(404).end();
    }

    await req.blog.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting blog by ID: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
