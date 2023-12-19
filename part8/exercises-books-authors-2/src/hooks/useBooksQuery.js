import { useQuery } from "@apollo/client";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../graphql/queries";

const useBooksQuery = genre => {
  const { loading, data } = useQuery(genre ? BOOKS_BY_GENRE : ALL_BOOKS, {
    variables: {
      genre
    }
  });

  return {
    loading: loading,
    books: data?.allBooks || []
  };
};

export default useBooksQuery;
