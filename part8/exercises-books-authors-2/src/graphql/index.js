import { ApolloClient, InMemoryCache, createHttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

// Function to create the HTTP link
const createHttpLinkWithToken = () => {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql"
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("user-token");

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    };
  });

  return authLink.concat(httpLink);
};

// Function to create the WebSocket link
const createWsLink = () => {
  return new GraphQLWsLink(
    createClient({
      url: "ws://localhost:4000/graphql",
      shouldRetry: true,
      retryAttempts: 3
    })
  );
};

// Function to determine the link based on the operation type
const createLink = () => {
  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    createWsLink(),
    createHttpLinkWithToken()
  );
};

// Create Apollo Client
export const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createLink()
  });
};
