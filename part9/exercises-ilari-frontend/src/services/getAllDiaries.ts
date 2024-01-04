import axios from "axios";
import { Diary } from "../types";

export const getAllDiaries = async (): Promise<Array<Diary>> => {
  try {
    const { data } = await axios.get("http://localhost:3001/api/diaries");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      console.error(error);
      throw new Error("get diaries error");
    }
  }
};
