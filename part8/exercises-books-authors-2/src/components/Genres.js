const Genres = ({ onGenreClick }) => {
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

  return (
    <div>
      <button onClick={() => onGenreClick(null)}>all genres</button>
      {genres.map(genre => (
        <button key={genre} onClick={() => onGenreClick(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Genres;
