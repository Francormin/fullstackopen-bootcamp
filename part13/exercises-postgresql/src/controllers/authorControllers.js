const { fn, col } = require("sequelize");
const { Blog } = require("../models");

const getAuthorsStats = async (_req, res) => {
  const authors = await Blog.findAll({
    attributes: ["author", [fn("COUNT", col("*")), "articles"], [fn("SUM", col("likes")), "likes"]],
    group: "author",
    order: [[fn("SUM", col("likes")), "DESC"]]
  });

  res.json(authors);
};

const authorControllers = { getAuthorsStats };

module.exports = authorControllers;
