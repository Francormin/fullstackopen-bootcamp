import axios from "axios";
import { Diary, NewDiaryEntry } from "../types";

export const createNewDiary = async (newDiary: NewDiaryEntry): Promise<Diary> => {
  try {
    const { data } = await axios.post<Diary>("http://localhost:3001/api/diaries", newDiary);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      console.error(error);
      throw new Error("post diary error");
    }
  }
};
