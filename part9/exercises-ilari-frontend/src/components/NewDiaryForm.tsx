import { useState } from "react";
import { Diary } from "../types";
import useNewDiaryForm from "../hooks/useNewDiaryForm";

interface NewDiaryFormProps {
  onNewDiary: (newDiary: Diary) => void;
}

const NewDiaryForm = ({ onNewDiary }: NewDiaryFormProps) => {
  const { inputValues, handleInputChange, resetForm, addNewDiary } = useNewDiaryForm();
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    handleInputChange(event);

  const handleClear = () => resetForm();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const createdDiary = await addNewDiary(inputValues);
      onNewDiary(createdDiary);
      resetForm();
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
        return setTimeout(() => {
          setError("");
        }, 5000);
      }

      if (error instanceof Error) {
        setError(error.message);
        return setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h2>Add new diary</h2>

      {!!error.length && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputValues.date} type="date" name="date" placeholder="date" required />

        <select onChange={handleChange} value={inputValues.weather} name="weather" required>
          <option disabled value="">
            Select weather conditions
          </option>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="windy">Windy</option>
        </select>

        <select onChange={handleChange} value={inputValues.visibility} name="visibility" required>
          <option disabled value="">
            Select visibility conditions
          </option>
          <option value="great">Great</option>
          <option value="good">Good</option>
          <option value="ok">Ok</option>
          <option value="poor">Poor</option>
        </select>

        <textarea
          onChange={handleChange}
          value={inputValues.comment}
          name="comment"
          placeholder="Write some comments about the flight experience..."
          required
        />

        <button onClick={handleClear} type="button">
          Clear Form
        </button>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;
