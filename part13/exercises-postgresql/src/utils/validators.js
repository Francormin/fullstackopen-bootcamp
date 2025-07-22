const { BadRequestError } = require("./errors");

const validateIdParam = id => {
  if (!id) throw new BadRequestError("Blog ID is required");
  if (isNaN(id)) throw new BadRequestError("Blog ID must be a number");
  if (Number(id) < 1) throw new BadRequestError("Blog ID must be a positive integer");
};

module.exports = { validateIdParam };
