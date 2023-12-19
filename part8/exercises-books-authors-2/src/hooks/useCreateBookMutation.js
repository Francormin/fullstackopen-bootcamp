import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "../graphql/mutations";

const useCreateBookMutation = ({ onCompleted, onError }) => {
  const [createBook] = useMutation(CREATE_BOOK, {
    onCompleted,
    onError
  });

  return {
    createBook
  };
};

export default useCreateBookMutation;
