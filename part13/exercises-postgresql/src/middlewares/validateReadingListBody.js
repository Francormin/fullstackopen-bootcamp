const { BadRequestError } = require("../utils/errors");

const validateReadingListBody = (req, _res, next) => {
  if (!req.body?.userId || !req.body?.blogId)
    throw new BadRequestError("Both userId and blogId are required");

  next();
};

module.exports = validateReadingListBody;
