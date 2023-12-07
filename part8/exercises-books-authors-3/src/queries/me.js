const { validateAuth } = require("../utils/validation");

const me = async (_, __, context) => {
  // Check if the user is authenticated
  validateAuth(context.currentUser);

  // Retrieve the user details from the context
  const { id, username, favoriteGenre } = context.currentUser;

  // Create and return the User object
  return {
    id,
    username,
    favoriteGenre
  };
};

module.exports = me;
