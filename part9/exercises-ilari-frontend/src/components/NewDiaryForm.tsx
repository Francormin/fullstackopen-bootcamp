import { Diary } from "../types";
import useNewDiaryForm from "../hooks/useNewDiaryForm";

interface NewDiaryFormProps {
  onNewDiary: (newDiary: Diary) => void;
}

const NewDiaryForm = ({ onNewDiary }: NewDiaryFormProps) => {
  const { inputValues, handleInputChange, resetForm } = useNewDiaryForm();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    handleInputChange(event);

  const handleClear = () => resetForm();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onNewDiary({
      ...inputValues,
      id: Math.floor(Math.random() * 1000)
    });

    resetForm();
  };

  return (
    <div>
      <h2>Add new diary</h2>

      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputValues.date} type="date" name="date" placeholder="date" />

        <select onChange={handleChange} value={inputValues.weather} name="weather">
          <option disabled value="">
            Select weather conditions
          </option>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="windy">Windy</option>
        </select>

        <select onChange={handleChange} value={inputValues.visibility} name="visibility">
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
          placeholder="Write some optional comments..."
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
