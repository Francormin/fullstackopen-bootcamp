const { BadRequestError } = require("../utils/errors");

const validateParamId = (req, _res, next) => {
  if (isNaN(req.params.id)) throw new BadRequestError("Param id must be a number");
  if (Number(req.params.id) < 1) throw new BadRequestError("Param id must be a positive integer");

  next();
};

module.exports = validateParamId;
