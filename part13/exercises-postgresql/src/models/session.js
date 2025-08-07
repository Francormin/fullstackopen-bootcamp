const { DataTypes } = require("sequelize");
const { sequelize } = require("../utils/db");

const Session = sequelize.define(
  "session",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    underscored: true,
    timestamps: true
  }
);

module.exports = Session;
