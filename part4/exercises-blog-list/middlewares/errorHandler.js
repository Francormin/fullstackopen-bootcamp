module.exports = (error, request, response, next) => {
  console.log("message:", error.message);

  if (error.name === "CastError") {
    response.status(400).send({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    if (error.message.includes("name")) {
      response.status(400).json({ error: "Name must be unique and must have at least 3 letters" });
    } else if (error.message.includes("number")) {
      response.status(400).json({ error: "Number must be unique and must have at least 8 digits" });
    }
  } else response.status(500).end();
};
