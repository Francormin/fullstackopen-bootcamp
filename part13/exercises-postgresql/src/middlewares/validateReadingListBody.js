const { BadRequestError } = require("../utils/errors");

const validateReadingListBody = (req, _res, next) => {
  const { userId, blogId } = req.body;

  if (!userId || !blogId) throw new BadRequestError("Both userId and blogId are required");
  next();
};

module.exports = validateReadingListBody;
