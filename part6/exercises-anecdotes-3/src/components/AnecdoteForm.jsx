import { connect } from "react-redux";
import { createAnecdote } from "./../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault();

    const content = event.target.content.value;
    event.target.content.value = "";

    props.addAnecdote(content);
    props.setNotification(`You added "${content}"`, 5);
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

const mapDispatchToProps = dispatch => {
  return {
    addAnecdote: value => {
      dispatch(createAnecdote(value));
    },
    setNotification: (message, seconds) => {
      dispatch(setNotification(message, seconds));
    }
  };
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
