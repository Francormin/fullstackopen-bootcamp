import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const useBooksQuery = () => {
  const result = useQuery(ALL_BOOKS);

  return {
    loading: result.loading,
    books: result.data?.allBooks || []
  };
};

export default useBooksQuery;
