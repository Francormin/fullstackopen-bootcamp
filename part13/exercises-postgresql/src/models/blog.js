const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Blog = sequelize.define(
  "blog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        isString(value) {
          if (typeof value !== "string") {
            throw new Error("Author must be a string");
          }
        }
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Url is required" },
        notEmpty: { msg: "Url cannot be empty" },
        isUrl: { msg: "Url must be valid" }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title cannot be empty" },
        isString(value) {
          if (typeof value !== "string") {
            throw new Error("Title must be a string");
          }
        }
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        isInt: { msg: "Likes must be a number" },
        min: { args: [0], msg: "Likes cannot be negative" }
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Year is required" },
        isInt: { msg: "Year must be a number" },
        min: { args: [1991], msg: "Year must be at least 1991" },
        max: { args: [new Date().getFullYear()], msg: "Year cannot be in the future" }
      }
    }
  },
  {
    underscored: true,
    timestamps: true
  }
);

Blog.prototype.toPublicJSON = function () {
  const data = this.toJSON();
  delete data.userId;
  delete data.user_id;
  return data;
};

module.exports = Blog;
