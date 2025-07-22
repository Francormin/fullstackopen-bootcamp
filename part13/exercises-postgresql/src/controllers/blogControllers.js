const { Blog } = require("../models");

const getAll = async (_req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
};

const getById = async (req, res) => {
  return res.json(req.blog);
};

const create = async (req, res) => {
  const { author, url, title, likes } = req.body;

  const newBlog = await Blog.create({
    author,
    url,
    title,
    likes
  });

  res.status(201).json(newBlog);
};

const updateById = async (req, res) => {
  const { author, url, title, likes } = req.body;

  req.blog.author = author ?? req.blog.author;
  req.blog.url = url ?? req.blog.url;
  req.blog.title = title ?? req.blog.title;
  req.blog.likes = likes ?? req.blog.likes;

  await req.blog.save();
  res.json(req.blog);
};

const deleteById = async (req, res) => {
  await req.blog.destroy();
  res.status(204).end();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
