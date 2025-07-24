const { User } = require("../models");
const { NotFoundError } = require("../utils/errors");
const { validateParamId } = require("../utils/validators");

const userFinder = async (req, _res, next) => {
  validateParamId(req.params.id);
  req.user = await User.findByPk(req.params.id);
  if (!req.user) throw new NotFoundError("User not found");
  next();
};

module.exports = userFinder;
