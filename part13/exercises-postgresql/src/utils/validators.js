const { BadRequestError } = require("./errors");

const validateParamId = id => {
  if (isNaN(id)) throw new BadRequestError("Param id must be a number");
  if (Number(id) < 1) throw new BadRequestError("Param id must be a positive integer");
};

module.exports = { validateParamId };
