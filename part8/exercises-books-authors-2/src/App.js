import { useEffect, useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

import { ALL_AUTHORS, BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { bookAdded } = subscriptionData.data;
      window.alert(`${bookAdded.title} added`);
      client.cache.modify({
        fields: {
          allBooks(allBooks) {
            return allBooks.concat(bookAdded);
          },
          allAuthors() {
            const { allAuthors } = client.readQuery({ query: ALL_AUTHORS });
            const existingAuthor = allAuthors.find(author => author.name === bookAdded.author.name);

            if (!existingAuthor) {
              allAuthors.push({
                name: bookAdded.author.name,
                bookCount: 1
              });
            } else {
              existingAuthor.bookCount += 1;
            }

            return allAuthors;
          }
        }
      });
    }
  });

  const logoutHandler = () => {
    setToken(null);
    setPage("authors");
    setError(null);
    window.localStorage.removeItem("user-token");
    client.resetStore();
  };

  useEffect(() => {
    const token = window.localStorage.getItem("user-token");
    if (token) {
      setToken(token);
    }
  }, [setToken]);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("recommendations")}>recommend</button>}

        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={logoutHandler}>logout</button>}
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <Authors show={page === "authors"} setError={setError} token={token} />

      <Books show={page === "books"} token={token} />

      <NewBook show={page === "add"} setError={setError} token={token} setPage={setPage} />

      <Recommendations show={page === "recommendations"} />

      <LoginForm show={page === "login"} error={error} setError={setError} setPage={setPage} setToken={setToken} />
    </div>
  );
};

export default App;
