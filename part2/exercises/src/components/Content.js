import { Part } from "./Part";

export const Content = ({ parts }) => {
  const totalExercises = parts.map(part => part.exercises).reduce((acc, curr) => acc + curr);

  return (
    <>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <strong>total of {totalExercises} exercises</strong>
    </>
  );
};
