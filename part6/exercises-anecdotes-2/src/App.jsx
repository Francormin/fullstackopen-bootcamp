import { useMutation, useQuery, useQueryClient } from "react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./../requests";
import { useNotificationDispatch } from "../NotificationContext";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData("anecdotes");

      queryClient.setQueryData(
        "anecdotes",
        anecdotes.map(anecdote => (anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote))
      );
    }
  });

  const handleVote = anecdote => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "SET_NOTIFICATION", payload: `anecdote '${anecdote.content}' voted` });

    setTimeout(() => {
      dispatch({ type: "SET_NOTIFICATION", payload: "" });
    }, 5000);
  };

  const { isLoading, data, status } = useQuery("anecdotes", getAnecdotes, {
    retry: 1
  });

  return (
    <div>
      <h3>Anecdote app</h3>

      {status === "error" ? (
        <div>anecdote service not available due to problems in server</div>
      ) : isLoading ? (
        <div>loading data...</div>
      ) : (
        <div>
          <Notification />
          <AnecdoteForm dispatch={dispatch} />
          {data.map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
