import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h2>Statistics</h2>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={all} />
            <StatisticLine text="Average" value={!isNaN(average) ? average : null} />
            <StatisticLine text="Positive" value={`${positive || null} %`} />
          </tbody>
        </table>
      )}
    </div>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(g => g + 1);
  };

  const handleNeutral = () => {
    setNeutral(n => n + 1);
  };

  const handleBad = () => {
    setBad(b => b + 1);
  };

  const all = good + neutral + bad;
  const average = Number(((good * 1 + neutral * 0 + bad * -1) / all).toFixed(2));
  const positive = Number(((good * 100) / (good + neutral + bad)).toFixed(1));

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handler={handleGood} text={"Good"} />
      <Button handler={handleNeutral} text={"Neutral"} />
      <Button handler={handleBad} text={"Bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
