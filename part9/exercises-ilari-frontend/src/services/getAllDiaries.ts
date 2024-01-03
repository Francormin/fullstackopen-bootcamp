import { Diary } from "../types";

export const getAllDiaries = async (): Promise<Array<Diary>> => {
  try {
    const response = await window.fetch("http://localhost:3001/api/diaries");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error("get diaries error");
  }
};
