import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

const useAuthorsQuery = () => {
  const { loading, data } = useQuery(ALL_AUTHORS);

  return {
    loading,
    authors: data?.allAuthors || []
  };
};

export default useAuthorsQuery;
