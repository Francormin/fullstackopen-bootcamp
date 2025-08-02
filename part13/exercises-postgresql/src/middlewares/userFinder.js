const { validateParamId } = require("../utils/validators");
const { findUserById } = require("../utils/queries/userQueries");

const userFinder = (options = {}) => {
  return async (req, _res, next) => {
    validateParamId(req.params.id);

    const user = await findUserById(req.params.id, options.includeReadingList);
    req.user = user;

    next();
  };
};

module.exports = userFinder;
