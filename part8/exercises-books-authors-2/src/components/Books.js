import { useEffect, useState } from "react";

import useBooksQuery from "../hooks/useBooksQuery";
import Genres from "./Genres";
import BookTable from "./BookTable";

const Books = ({ show, token }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const genres = [
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
  ];

  const { loading, books } = useBooksQuery();

  useEffect(() => {
    setSelectedGenre(null);
  }, [token]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <p>
        in genre <strong>{selectedGenre === null ? "all genres" : selectedGenre}</strong>
      </p>

      {/* Extracted Genres component */}
      <Genres genres={genres} onGenreClick={setSelectedGenre} />

      {/* Extracted BookTable component */}
      <BookTable
        books={books}
        filterFunction={book => selectedGenre === null || (book.genres && book.genres.includes(selectedGenre))}
      />
    </div>
  );
};

export default Books;
