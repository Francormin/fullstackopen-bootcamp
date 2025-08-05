const { findUserById } = require("../utils/queries/userQueries");

const userFinder = (options = {}) => {
  return async (req, _res, next) => {
    let read;

    if (req.query.read === "true") read = true;
    else if (req.query.read === "false") read = false;

    const user = await findUserById(req.params.id, read, options.includeReadingList);
    req.user = user;

    next();
  };
};

module.exports = userFinder;
