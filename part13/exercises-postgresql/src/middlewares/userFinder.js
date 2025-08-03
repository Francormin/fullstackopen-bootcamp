const { findUserById } = require("../utils/queries/userQueries");

const userFinder = (options = {}) => {
  return async (req, _res, next) => {
    const user = await findUserById(req.params.id, options.includeReadingList);
    req.user = user;

    next();
  };
};

module.exports = userFinder;
