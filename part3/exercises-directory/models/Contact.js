const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3
  },
  number: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 8
  }
});

contactSchema.plugin(uniqueValidator);
contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Contact", contactSchema);
