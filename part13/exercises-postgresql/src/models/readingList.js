const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const ReadingList = sequelize.define(
  "reading_list",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: { msg: "Read status is required" },
        isIn: { args: [[true, false]], msg: "Read status must be true or false" }
      }
    }
  },
  {
    underscored: true,
    timestamps: true
  }
);

module.exports = ReadingList;
