const { GraphQLError } = require("graphql");

const validateBookTitle = title => {
  if (title.length < 2) {
    throw new GraphQLError("Book's title must have a minimum length of 2 characters", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: title
      }
    });
  }
};

const validateBookPublished = published => {
  if (published <= 300) {
    throw new GraphQLError("Book's published year must be greater than 300", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: published
      }
    });
  }
};

const validateAuthorName = author => {
  if (author.length < 4) {
    throw new GraphQLError("Author's name must have a minimum length of 4 characters", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: author
      }
    });
  }
};

const validateAuthorBorn = born => {
  if (born <= 200) {
    throw new GraphQLError("Author's birth year must be greater than 200", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: born
      }
    });
  }
};

module.exports = {
  validateBookTitle,
  validateBookPublished,
  validateAuthorName,
  validateAuthorBorn
};
