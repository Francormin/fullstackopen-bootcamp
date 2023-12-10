import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_CURRENT_USER } from "../queries";

const useRecommendationsQuery = () => {
  const { loading, data: { allBooks = [] } = {} } = useQuery(ALL_BOOKS);
  const { data = {} } = useQuery(GET_CURRENT_USER);
  const { me: { favoriteGenre = "" } = {} } = data;

  return {
    loading,
    favoriteGenre,
    recommendedBooks: allBooks.filter(book => book.genres.includes(favoriteGenre))
  };
};

export default useRecommendationsQuery;
