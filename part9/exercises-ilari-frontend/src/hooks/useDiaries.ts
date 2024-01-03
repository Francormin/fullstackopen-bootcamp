import { useEffect, useState } from "react";
import { getAllDiaries } from "../services/getAllDiaries";
import { Diary } from "../types";

const useDiaries = () => {
  const [diaries, setDiaries] = useState<Array<Diary>>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      const diaries = await getAllDiaries();
      if (diaries) {
        setDiaries(diaries);
      }
    };

    fetchDiaries();
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
