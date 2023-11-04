import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    switch (filter) {
      case "SEMIPOPULAR":
        return anecdotes
          .slice()
          .filter(a => a.votes >= 5 && a.votes < 10)
          .sort((a, b) => b.votes - a.votes);
      case "POPULAR":
        return anecdotes
          .slice()
          .filter(a => a.votes >= 10)
          .sort((a, b) => b.votes - a.votes);
      default:
        return anecdotes.slice().sort((a, b) => b.votes - a.votes);
    }
  });

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={anecdotes} />
      <AnecdoteForm />
    </div>
  );
};

export default App;
