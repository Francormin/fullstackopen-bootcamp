const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const { MONGO_URL } = require("../util/config");

const connectToDatabase = async () => {
  if (!MONGO_URL) {
    console.error("No MONGO_URL defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports = {
  Todo,
  connectToDatabase
};
