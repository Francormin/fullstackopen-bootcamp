import { useEffect, useState } from "react";

import { Diary } from "./types";
import Diaries from "./components/Diaries";
import NewDiaryForm from "./components/NewDiaryForm";
import "./App.css";

interface AppState {
  diaries: Array<Diary>;
}

const INITIAL_STATE = [
  {
    id: 1,
    date: "2017-01-01",
    weather: "sunny",
    visibility: "great",
    comment: "Such a lovely day!"
  },
  {
    id: 2,
    date: "2017-01-02",
    weather: "cloudy",
    visibility: "good"
  }
];

function App() {
  const [diaries, setDiaries] = useState<AppState["diaries"]>([]);

  const handleNewDiary = (newDiary: Diary) => {
    setDiaries(diaries => [...diaries, newDiary]);
  };

  useEffect(() => {
    setDiaries(INITIAL_STATE);
  }, []);

  return (
    <div className="App">
      <h1>Ilari's Flight Diaries</h1>
      <Diaries diaries={diaries} />
      <NewDiaryForm onNewDiary={handleNewDiary} />
    </div>
  );
}

export default App;
