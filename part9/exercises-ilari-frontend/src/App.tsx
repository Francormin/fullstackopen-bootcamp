import useDiaries from "./hooks/useDiaries";
import Diaries from "./components/Diaries";
import NewDiaryForm from "./components/NewDiaryForm";
import "./App.css";

function App() {
  const { diaries, handleNewDiary } = useDiaries();

  return (
    <div className="App">
      <h1>Ilari's Flight Diaries</h1>
      <Diaries diaries={diaries} />
      <NewDiaryForm onNewDiary={handleNewDiary} />
    </div>
  );
}

export default App;
