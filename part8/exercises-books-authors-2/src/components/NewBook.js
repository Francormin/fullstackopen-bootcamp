import { useState } from "react";
import useCreateBookMutation from "../hooks/useCreateBokkMutation";

const NewBook = ({ show, setError }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const { createBook } = useCreateBookMutation({
    onCompleted: () => handleCreateBookSuccess(),
    onError: error => handleCreateBookError(error)
  });

  const handleCreateBookSuccess = () => {
    setError(null);
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const handleCreateBookError = ({ networkError }) => {
    setError(networkError.result.errors[0].message);

    setTimeout(() => {
      setError(null);
    }, 5000);
  };

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
    setGenres(prevGenres => [...prevGenres, genre]);
    setGenre("");
  };

  if (!show) {
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
