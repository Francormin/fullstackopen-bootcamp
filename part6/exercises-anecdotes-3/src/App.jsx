import { connect } from "react-redux";
import { useEffect } from "react";

import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = props => {
  useEffect(() => {
    props.initializeAnecdotes();
  }, [props]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

const ConnectedApp = connect(null, { initializeAnecdotes })(App);
export default ConnectedApp;
