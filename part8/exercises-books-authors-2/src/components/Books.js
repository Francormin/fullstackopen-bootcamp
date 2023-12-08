import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = props => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([
    "refactoring",
    "agile",
    "patterns",
    "design",
    "crime",
    "classic",
    "revolution",
    "programming",
    "logic",
    "fantasy",
    "drama",
    "sci-fi"
  ]);

  const result = useQuery(ALL_BOOKS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data?.allBooks || [];

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <strong>{selectedGenre === null ? "all genres" : selectedGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(book => selectedGenre === null || (book.genres && book.genres.includes(selectedGenre)))
            .map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
        {genres.map(genre => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
