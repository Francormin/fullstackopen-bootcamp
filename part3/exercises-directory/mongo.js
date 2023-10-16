const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please provide the password as 3rd argument: node mongo.js <password>");
  process.exit(1);
}

if (process.argv.length === 4) {
  console.log(
    "Please provide the name and the number as 4th and 5th arguments: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const PASSWORD = process.argv[2];
const MONGO_URI = `mongodb+srv://francormin:${PASSWORD}@cluster0.el9fojv.mongodb.net/directory-app?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Contact = mongoose.model("Contact", contactSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");
  Contact.find({})
    .then(contacts => {
      contacts.map(contact => console.log(`${contact.name} ${contact.number}`));
      mongoose.connection.close();
    })
    .catch(error => console.error(error));
}

if (process.argv.length === 5) {
  const NAME = process.argv[3];
  const NUMBER = process.argv[4];

  const contact = new Contact({
    name: NAME,
    number: NUMBER
  });

  contact
    .save()
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    })
    .catch(error => console.error(error));
}
