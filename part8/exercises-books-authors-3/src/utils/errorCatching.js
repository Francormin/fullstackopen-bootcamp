const { UserInputError } = require("apollo-server-errors");
const { GraphQLError } = require("graphql");

const errorCatching = (error, message) => {
  // Check if the error is a UserInputError and rethrow it
  if (error instanceof UserInputError) {
    throw error;
  }

  // Handle other errors
  throw new GraphQLError(message, {
    extensions: {
      http: {
        status: 500
      },
      code: "INTERNAL_SERVER_ERROR",
      error
    }
  });
};

module.exports = errorCatching;
