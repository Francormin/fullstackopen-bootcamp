import { Diary } from "../types";

export const getAllDiaries = async (): Promise<Array<Diary>> => {
  const response = await window.fetch("http://localhost:3001/api/diaries");
  return await response.json();
};
