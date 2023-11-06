import { useDispatch } from "react-redux";
import { likeAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch();

  const handleClick = anecdote => {
    dispatch(likeAnecdote(anecdote));
    dispatch(setNotification(`You voted "${anecdote.content}"`, 5));
  };

  return anecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        Has {anecdote.votes} <button onClick={() => handleClick(anecdote)}>Vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
