const ERROR_HANDLERS = {
  CastError: response => {
    response.status(400).send({
      error: "malformatted id"
    });
  },
  ValidationError: (response, error) => {
    response.status(400).send({
      error: error.message
    });
  },
  JsonWebTokenError: response => {
    response.status(401).send({
      error: "invalid token"
    });
  },
  TokenExpiredError: response => {
    response.status(401).send({
      error: "token expired"
    });
  },
  defaultError: response => {
    response.status(500).end();
  }
};

module.exports = (error, response) => {
  console.error("errorHandler:", error.message);

  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(response, error);
};
