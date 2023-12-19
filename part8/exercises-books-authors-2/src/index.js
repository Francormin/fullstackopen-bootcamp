import { ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";

import { createApolloClient } from "./graphql";
import App from "./App";

// Create Apollo Client
const client = createApolloClient();

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
