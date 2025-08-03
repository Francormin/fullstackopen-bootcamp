const { Op } = require("sequelize");
const { Blog, User } = require("../models");

const getAll = async (req, res) => {
  let where = {};

  if (req.query?.search) {
    const searchTerm = `%${req.query.search}%`;
    where = {
      [Op.or]: [{ title: { [Op.iLike]: searchTerm } }, { author: { [Op.iLike]: searchTerm } }]
    };
  }

  const blogs = await Blog.findAll({
    attributes: {
      exclude: ["userId"]
    },
    include: {
      model: User,
      attributes: ["username", "name"]
    },
    where,
    order: [["likes", "DESC"]]
  });

  res.json(blogs);
};

const getById = async (req, res) => res.json(req.blog.toPublicJSON());

const create = async (req, res) => {
  const { author, url, title, likes, year } = req.body;

  const newBlog = await Blog.create({
    author,
    url,
    title,
    likes,
    year,
    userId: req.user.id
  });

  res.status(201).json(newBlog.toPublicJSON());
};

const updateById = async (req, res) => {
  const { author, url, title, likes, year } = req.body ?? {};

  req.blog.author = author ?? req.blog.author;
  req.blog.url = url ?? req.blog.url;
  req.blog.title = title ?? req.blog.title;
  req.blog.likes = likes ?? req.blog.likes;
  req.blog.year = year ?? req.blog.year;

  await req.blog.save();
  res.json(req.blog.toPublicJSON());
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
