const { User, Blog } = require("../models");

const getAll = async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ["author", "url", "title", "likes", "year"]
    }
  });

  res.json(users);
};

const getById = (req, res) =>
  res.json({
    name: req.user.name,
    username: req.user.username,
    readings: req.user.saved_blogs
  });

const create = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

const updateById = async (req, res) => {
  const { username, name } = req.body;

  req.user.username = username ?? req.user.username;
  req.user.name = name ?? req.user.name;

  await req.user.save();
  res.json(req.user);
};

const deleteById = async (req, res) => {
  await req.user.destroy();
  res.status(204).end();
};

const userControllers = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};

module.exports = userControllers;
