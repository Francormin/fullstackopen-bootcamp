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
        notEmpty: { msg: "Url is required" },
        isUrl: { msg: "Url must be valid" }
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title is required" },
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
    }
  },
  {
    timestamps: false // Para evitar columnas createdAt/updatedAt
  }
);

module.exports = Blog;
