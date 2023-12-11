import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_CURRENT_USER } from "../queries";

const useRecommendationsQuery = () => {
  const { loading: booksLoading, data: { allBooks = [] } = {} } = useQuery(ALL_BOOKS);
  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_CURRENT_USER);

  // Check for errors in user query
  if (userError) {
    console.error("Error fetching user data:", userError);
    return { loading: false, favoriteGenre: "", recommendedBooks: [] };
  }

  // Extract favoriteGenre after ensuring user data is available
  const { me: { favoriteGenre = "" } = {} } = userData || {};

  // Check for loading state only when there's actual loading happening
  const loading = booksLoading || userLoading;

  return {
    loading,
    favoriteGenre,
    recommendedBooks: allBooks.filter(book => book.genres.includes(favoriteGenre))
  };
};

export default useRecommendationsQuery;
