import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../../requests";

const AnecdoteForm = ({ dispatch }) => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData("anecdotes");

      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: ({ response }) => {
      dispatch({ type: "SET_NOTIFICATION", payload: response.data.error });
      setTimeout(() => {
        dispatch({ type: "SET_NOTIFICATION", payload: "" });
      }, 5000);
    }
  });

  const onCreate = async event => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate({ content, votes: 0 });

    dispatch({ type: "SET_NOTIFICATION", payload: `'${content}' added` });
    setTimeout(() => {
      dispatch({ type: "SET_NOTIFICATION", payload: "" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
