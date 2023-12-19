import { useApolloClient, useQuery } from "@apollo/client";
import { ALL_BOOKS, CURRENT_USER } from "../graphql/queries";

const useRecommendationsQuery = () => {
  const client = useApolloClient();
  const results = client.readQuery({ query: ALL_BOOKS });

  // Check if the user is authenticated before making the query
  const token = localStorage.getItem("user-token");
  const {
    loading: userLoading,
    error: userError,
    data: userData
  } = useQuery(CURRENT_USER, {
    skip: !token // Skip the query if the token doesn't exist
  });

  // Check for errors in user query
  if (userError) {
    console.error("error:", userError);
    return { loading: false, favoriteGenre: "", recommendedBooks: [] };
  }

  // Extract favoriteGenre after ensuring user data is available
  const { me: { favoriteGenre = "" } = {} } = userData || {};

  // Check for loading state only when there's actual loading happening
  const loading = userLoading;

  return {
    loading,
    favoriteGenre,
    recommendedBooks: results?.allBooks.filter(book => book.genres.includes(favoriteGenre))
  };
};

export default useRecommendationsQuery;
