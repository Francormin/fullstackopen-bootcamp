import { useState } from "react";
import { Diary, NewDiaryEntry } from "../types";

interface NewDiaryFormState {
  inputValues: NewDiaryEntry;
}

interface NewDiaryFormProps {
  onNewDiary: (newDiary: Diary) => void;
}

const INITIAL_STATE = {
  date: "",
  weather: "",
  visibility: "",
  comment: ""
};

const NewDiaryForm = ({ onNewDiary }: NewDiaryFormProps) => {
  const [inputValues, setInputValues] = useState<NewDiaryFormState["inputValues"]>(INITIAL_STATE);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setInputValues({
      ...inputValues,
      [name]: value
    });
  };

  const handleClear = () => {
    setInputValues(INITIAL_STATE);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onNewDiary({
      ...inputValues,
      id: Math.floor(Math.random() * 1000)
    });

    handleClear();
  };

  return (
    <div>
      <h2>Add new diary</h2>

      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={inputValues.date} type="date" name="date" placeholder="date" />

        <select onChange={handleChange} value={inputValues.weather} name="weather">
          <option selected disabled value="">
            Select weather conditions
          </option>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cloudy">Cloudy</option>
          <option value="stormy">Stormy</option>
          <option value="windy">Windy</option>
        </select>

        <select onChange={handleChange} value={inputValues.visibility} name="visibility">
          <option selected disabled value="">
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
