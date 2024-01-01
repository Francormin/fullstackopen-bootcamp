import { useEffect, useState } from "react";
import { getAllDiaries } from "../services/getAllDiaries";
import { Diary } from "../types";

const useDiaries = () => {
  const [diaries, setDiaries] = useState<Array<Diary>>([]);

  useEffect(() => {
    getAllDiaries()
      .then(diaries => setDiaries(diaries))
      .catch(error => console.error(error));
  }, []);

  const handleNewDiary = (newDiary: Diary) => {
    setDiaries(prevDiaries => [...prevDiaries, newDiary]);
  };

  return {
    diaries,
    handleNewDiary
  };
};

export default useDiaries;
