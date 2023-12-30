import { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(5);

  const changeNumber = () => {
    setNumber(number + 1);
  };

  return (
    <div className="App">
      <div>{number}</div>
      <button onClick={changeNumber}>Change number</button>
    </div>
  );
}

export default App;
