import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
      published
      genres
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const NewBook = props => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: error => {
      console.log(error);
    }
  });

  const submit = async event => {
    event.preventDefault();

    console.log("add book...");

    await createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres
      }
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
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
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>

        <div>
          published
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
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
