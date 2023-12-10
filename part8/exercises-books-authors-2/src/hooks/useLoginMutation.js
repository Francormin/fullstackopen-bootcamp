import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const useLoginMutation = ({ onCompleted, onError }) => {
  const [login] = useMutation(LOGIN, {
    onCompleted,
    onError
  });

  return {
    login
  };
};

export default useLoginMutation;
