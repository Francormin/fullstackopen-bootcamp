module.exports = (error, request, response, next) => {
  console.log("message:", error.message);

  if (error.name === "CastError") {
    response.status(400).send({
      error: "Malformatted id"
    });
  } else if (error.name === "ValidationError") {
    if (error.message.includes("username")) {
      response.status(400).send({
        error: "Username must be unique and must have at least 3 letters"
      });
    } else if (error.message.includes("passwordHash")) {
      response.status(400).send({
        error: "PasswordHash must have at least 3 letters"
      });
    }
  } else response.status(500).end();
};
