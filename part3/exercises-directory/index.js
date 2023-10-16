require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/Contact");
const unknownEndpoint = require("./middlewares/unknownEndpoint");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

morgan.token("body", function (req, res) {
  const { name, number } = req.body;
  return JSON.stringify({ name, number });
});

app.use(express.static("build"));
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(cors());

app.get("/api/info", (request, response, next) => {
  Contact.find({})
    .then(contacts => {
      response.send(`
      <p>Phonebook has info for ${contacts.length} contacts</p>
      <p>${new Date()}</p>
    `);
    })
    .catch(error => {
      next(error);
    });
});

app.get("/api/contacts", (request, response, next) => {
  Contact.find({})
    .then(contacts => {
      response.json(contacts);
    })
    .catch(error => {
      next(error);
    });
});

app.get("/api/contacts/:id", (request, response, next) => {
  const { id } = request.params;

  Contact.findById(id)
    .then(contact => {
      if (contact) response.json(contact);
      else response.status(404).end();
    })
    .catch(error => {
      next(error);
    });
});

app.post("/api/contacts", (request, response, next) => {
  const { name, number } = request.body;

  if (!name || !number) return response.status(400).send({ error: "Name and number are both required" });

  const contactToSave = new Contact({ name, number });
  contactToSave
    .save()
    .then(savedContact => {
      response.status(201).json(savedContact);
    })
    .catch(error => {
      next(error);
    });
});

app.put("/api/contacts/:id", (request, response, next) => {
  const { id } = request.params;
  const { name, number } = request.body;

  if (!name && !number) return response.status(400).send({ error: "There is nothing to update" });

  const contactToUpdate = { name, number };

  Contact.findByIdAndUpdate(id, contactToUpdate, { runValidators: true, new: true })
    .then(updatedContact => {
      if (updatedContact) response.json(updatedContact);
      else response.status(404).end();
    })
    .catch(error => {
      next(error);
    });
});

app.delete("/api/contacts/:id", (request, response, next) => {
  const { id } = request.params;

  Contact.findByIdAndDelete(id)
    .then(deletedContact => {
      if (deletedContact) response.status(204).end();
      else response.status(404).end();
    })
    .catch(error => {
      next(error);
    });
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
