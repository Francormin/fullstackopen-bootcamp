const { User, Blog } = require("../models");
const { NotFoundError } = require("../utils/errors");
const { validateParamId } = require("../utils/validators");

const userFinder = (options = {}) => {
  return async (req, _res, next) => {
    validateParamId(req.params.id);

    const queryOptions = options.includeReadingList
      ? {
          attributes: ["name", "username"],
          include: {
            model: Blog,
            as: "saved_blogs",
            through: { attributes: [] }, // Para no incluir datos de la tabla intermedia
            attributes: ["id", "url", "title", "author", "likes", "year"]
          }
        }
      : undefined;

    const user = await User.findByPk(req.params.id, queryOptions);
    if (!user) throw new NotFoundError("User not found");
    req.user = user;
    next();
  };
};

module.exports = userFinder;
