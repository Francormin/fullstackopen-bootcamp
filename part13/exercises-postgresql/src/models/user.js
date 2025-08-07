const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        name: "unique_username_constraint",
        msg: "That username is already taken"
      },
      allowNull: false,
      validate: {
        notNull: { msg: "Username is required" },
        notEmpty: { msg: "Username cannot be empty" },
        isString(value) {
          if (typeof value !== "string") {
            throw new Error("Username must be a string");
          }
        },
        isEmail: { msg: "Username must be a valid email address" }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name cannot be empty" },
        isString(value) {
          if (typeof value !== "string") {
            throw new Error("Name must be a string");
          }
        }
      }
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: { msg: "Disabled is required" },
        isIn: { args: [[true, false]], msg: "Disabled must be true or false" }
      }
    }
  },
  {
    underscored: true,
    timestamps: true
  }
);

module.exports = User;
