const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
let contacts = require("./db.json");
const generateRandomId = require("./utils/generateRandomId");

const app = express();

morgan.token("body", function (req, res) {
  const { name, number } = req.body;
  return JSON.stringify({ name, number });
});

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
app.use(cors());

app.get("/api/info", (request, response) => {
  response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get("/api/contacts", (request, response) => {
  response.json(contacts);
});

app.get("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);

  const contact = contacts.find(contact => contact.id === id);

  if (contact) {
    response.json(contact);
  } else {
    response.status(404).end();
  }
});

app.post("/api/contacts", (request, response) => {
  const contact = request.body;

  if (!contact.name || !contact.number) {
    return response.status(400).json({
      error: "name and number are both required"
    });
  }

  if (contacts.find(cont => cont.name === contact.name)) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  contact.id = generateRandomId();
  contacts = contacts.concat(contact);

  response.status(201).json(contact);
});

app.delete("/api/contacts/:id", (request, response) => {
  const id = Number(request.params.id);

  contacts = contacts.filter(contact => contact.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
