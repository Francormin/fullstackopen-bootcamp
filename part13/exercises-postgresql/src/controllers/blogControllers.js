const { Blog, User } = require("../models");

const getAll = async (_req, res) => {
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ["userId"]
    },
    include: {
      model: User,
      attributes: ["username", "name"]
    }
  });
  res.json(blogs);
};

const getById = async (req, res) => res.json(req.blog);

const create = async (req, res) => {
  const { author, url, title, likes } = req.body;

  const user = await User.findByPk(req.decodedToken.id);

  const newBlog = await Blog.create({
    author,
    url,
    title,
    likes,
    userId: user.id
  });

  res.status(201).json(newBlog.toPublicJSON());
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

const blogControllers = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};

module.exports = blogControllers;
