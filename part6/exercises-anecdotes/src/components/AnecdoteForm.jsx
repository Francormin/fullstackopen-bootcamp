import { useDispatch } from "react-redux";
import { createAnecdote } from "./../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async event => {
    event.preventDefault();

    const content = event.target.content.value;
    dispatch(createAnecdote(content));
    event.target.content.value = "";
    dispatch(setNotification(`You added "${content}"`, 5));
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input type="text" name="content" />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
