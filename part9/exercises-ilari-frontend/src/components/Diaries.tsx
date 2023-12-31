import { Diary } from "../types";

interface DiariesProps {
  diaries: Array<Diary>;
}

const Diaries = ({ diaries }: DiariesProps) => {
  const renderDiaries = (): JSX.Element[] => {
    return diaries.map(diary => {
      return (
        <li key={diary.id}>
          <h3>{diary.id}</h3>
          <h3>{diary.date}</h3>
          <p>{diary.weather}</p>
          <p>{diary.visibility}</p>
          <p>{diary.comment}</p>
        </li>
      );
    });
  };

  return <ul>{renderDiaries()}</ul>;
};

export default Diaries;
