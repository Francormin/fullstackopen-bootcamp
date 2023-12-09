const Genres = ({ genres, onGenreClick }) => (
  <div>
    <button onClick={() => onGenreClick(null)}>all genres</button>
    {genres.map(genre => (
      <button key={genre} onClick={() => onGenreClick(genre)}>
        {genre}
      </button>
    ))}
  </div>
);

export default Genres;
