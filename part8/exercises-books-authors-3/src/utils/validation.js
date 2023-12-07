const { UserInputError, AuthenticationError } = require("apollo-server-errors");

const validateAuth = currentUser => {
  if (!currentUser) {
    throw new AuthenticationError("Not authenticated", {
      http: {
        status: 401
      },
      code: "UNAUTHENTICATED"
    });
  }
};

const validateBookCreation = (existingBook, title, published, author) => {
  if (existingBook) {
    throw new UserInputError("Book with the same title already exists", {
      http: {
        status: 409
      },
      code: "BAD_USER_INPUT",
      invalidArgs: title
    });
  }

  if (title.length < 2) {
    throw new UserInputError("Book's title must have a minimum length of 2 characters", {
      http: {
        status: 400
      },
      code: "BAD_USER_INPUT",
      invalidArgs: title
    });
  }

  if (published <= 300) {
    throw new UserInputError("Book's published year must be greater than 300", {
      http: {
        status: 400
      },
      code: "BAD_USER_INPUT",
      invalidArgs: published
    });
  }

  if (author.length < 4) {
    throw new UserInputError("Author's name must have a minimum length of 4 characters", {
      http: {
        status: 400
      },
      code: "BAD_USER_INPUT",
      invalidArgs: author
    });
  }
};

const validateAuthorEdition = (author, name, setBornTo) => {
  if (!author) {
    throw new UserInputError("Author not found", {
      http: {
        status: 404
      },
      code: "BAD_USER_INPUT",
      invalidArgs: name
    });
  }

  if (setBornTo <= 200) {
    throw new UserInputError("Author's birth year must be greater than 200", {
      http: {
        status: 400
      },
      code: "BAD_USER_INPUT",
      invalidArgs: setBornTo
    });
  }
};

const validateUserCreation = (existingUser, username) => {
  if (existingUser) {
    throw new UserInputError("User with the same username already exists", {
      http: {
        status: 409
      },
      code: "BAD_USER_INPUT",
      invalidArgs: username
    });
  }

  if (username.length < 5) {
    throw new UserInputError("Username must have a minimum length of 5 characters", {
      http: {
        status: 400
      },
      code: "BAD_USER_INPUT",
      invalidArgs: username
    });
  }
};

const validateLoginCredentials = (user, password) => {
  if (!user || password !== "secret") {
    throw new UserInputError("Wrong credentials", {
      http: {
        status: 401
      },
      code: "BAD_USER_INPUT"
    });
  }
};

module.exports = {
  validateAuth,
  validateBookCreation,
  validateAuthorEdition,
  validateUserCreation,
  validateLoginCredentials
};
