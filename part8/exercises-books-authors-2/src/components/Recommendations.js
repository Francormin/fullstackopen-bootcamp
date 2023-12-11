import useRecommendationsQuery from "../hooks/useRecommendationsQuery";
import BookTable from "./BookTable";

const Recommendations = ({ show }) => {
  const { loading, favoriteGenre, recommendedBooks } = useRecommendationsQuery();

  if (loading) {
    return <div>loading...</div>;
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>

      {!favoriteGenre ? (
        <p>no favorite genre added</p>
      ) : (
        <>
          <p>
            books in your favorite genre <strong>{favoriteGenre}</strong>
          </p>

          {/* Extracted BookTable component */}
          <BookTable books={recommendedBooks} />
        </>
      )}
    </div>
  );
};

export default Recommendations;
