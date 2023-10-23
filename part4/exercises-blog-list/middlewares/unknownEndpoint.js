module.exports = response => {
  response.status(404).send({
    error: "Unknown endpoint"
  });
};
