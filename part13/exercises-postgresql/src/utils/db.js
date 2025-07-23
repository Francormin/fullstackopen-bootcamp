const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = require("./config");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  logging: false
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database.");
  } catch (error) {
    console.log("Database connection failed: ", error);
    return process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectToDatabase
};
