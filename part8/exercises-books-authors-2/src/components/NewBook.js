import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";

const NewBook = props => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: ({ networkError }) => {
      props.setError(networkError.result.errors[0].message);

      setTimeout(() => {
        props.setError(null);
      }, 5000);
    },
    onCompleted: () => {
      props.setError(null);

      setTitle("");
      setPublished("");
      setAuthor("");
      setGenres([]);
      setGenre("");
    },
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook)
        };
      });

      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        // Assuming that response.data.addBook.author holds the author information
        const updatedAuthors = [...allAuthors];

        // Check if the author is already in the list
        const existingAuthor = updatedAuthors.find(author => author.name === response.data.addBook.author);

        // If the author exists, increment the book count; otherwise, add a new author
        if (existingAuthor) {
          existingAuthor.bookCount += 1;
        } else {
          updatedAuthors.push({
            name: response.data.addBook.author,
            bookCount: 1
          });
        }

        return {
          allAuthors: updatedAuthors
        };
      });
    }
  });

  const submit = event => {
    event.preventDefault();

    createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres
      }
    });
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>

        <div>
          published
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>

        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>

        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>

        <div>genres: {genres.join(" ")}</div>

        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
