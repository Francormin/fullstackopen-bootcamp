import { Diary, NewDiaryEntry } from "../types";

export const createNewDiary = async (newDiary: NewDiaryEntry): Promise<Diary> => {
  const response = await window.fetch("http://localhost:3001/api/diaries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newDiary)
  });

  return (await response.json()) as Diary;
};
