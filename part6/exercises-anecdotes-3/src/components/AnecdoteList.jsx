import { connect } from "react-redux";
import { likeAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const handleClick = anecdote => {
    props.likeAnecdote(anecdote);
    props.setNotification(`You voted "${anecdote.content}"`, 5);
  };

  return props.anecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        Has {anecdote.votes} <button onClick={() => handleClick(anecdote)}>Vote</button>
      </div>
    </div>
  ));
};

const mapStateToProps = state => {
  switch (state.filter) {
    case "SEMIPOPULAR":
      return {
        anecdotes: state.anecdotes
          .slice()
          .filter(a => a.votes >= 5 && a.votes < 10)
          .sort((a, b) => b.votes - a.votes)
      };
    case "POPULAR":
      return {
        anecdotes: state.anecdotes
          .slice()
          .filter(a => a.votes >= 10)
          .sort((a, b) => b.votes - a.votes)
      };
    default:
      return { anecdotes: state.anecdotes.slice().sort((a, b) => b.votes - a.votes) };
  }
};

const mapDispatchToProps = {
  likeAnecdote,
  setNotification
};

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default ConnectedAnecdoteList;
