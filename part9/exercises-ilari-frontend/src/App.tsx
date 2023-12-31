import { useEffect, useState } from "react";

import { Diary } from "./types";
import Diaries from "./components/Diaries";
import NewDiaryForm from "./components/NewDiaryForm";
import "./App.css";

interface AppState {
  diaries: Array<Diary>;
}

function App() {
  const [diaries, setDiaries] = useState<AppState["diaries"]>([]);

  const handleNewDiary = (newDiary: Diary) => {
    setDiaries(diaries => [...diaries, newDiary]);
  };

  useEffect(() => {
    const fetchDiaries = async (): Promise<Array<Diary>> => {
      const response = await window.fetch("http://localhost:3001/api/diaries");
      return await response.json();
    };

    fetchDiaries()
      .then(diaries => setDiaries(diaries))
      .catch(error => console.error(error));
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
