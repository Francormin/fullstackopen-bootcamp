import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomAnecdote = (currentIndex, length) => {
    const randomIndex = Math.floor(Math.random() * length);

    if (randomIndex === currentIndex && randomIndex !== length) {
      return randomIndex + 1;
    } else if (randomIndex === currentIndex && randomIndex === length) {
      return randomIndex - 1;
    } else {
      return randomIndex;
    }
  };

  const handleVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  return (
    <div>
      <h1>Anectode of the day</h1>
      <div>{anecdotes[selected]}</div>
      <p>Has {votes[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={() => setSelected(getRandomAnecdote(selected, anecdotes.length - 1))}>Next Anecdote</button>

      <h1>Anecdote with most votes</h1>
      {votes.every(elemenet => elemenet === 0) ? (
        <p>No anecdote has votes yet</p>
      ) : (
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      )}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
