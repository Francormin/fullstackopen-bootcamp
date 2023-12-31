import { useEffect, useState } from "react";

import useBooksQuery from "../hooks/useBooksQuery";
import Genres from "./Genres";
import BookTable from "./BookTable";

const Books = ({ show, token }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const { loading, books } = useBooksQuery(selectedGenre);

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
      <Genres onGenreClick={setSelectedGenre} />

      {/* Extracted BookTable component */}
      <BookTable books={books} />
    </div>
  );
};

export default Books;
