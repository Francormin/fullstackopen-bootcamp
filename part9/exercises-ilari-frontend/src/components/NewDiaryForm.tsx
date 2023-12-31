import { useReducer } from "react";
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

type NewDiaryFormReducerAction =
  | {
      type: "CHANGE_VALUE";
      payload: {
        inputName: string;
        inputValue: string;
      };
    }
  | {
      type: "CLEAR";
    };

const formReducer = (state: NewDiaryFormState["inputValues"], action: NewDiaryFormReducerAction) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      const { inputName, inputValue } = action.payload;
      return {
        ...state,
        [inputName]: inputValue
      };
    case "CLEAR":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const NewDiaryForm = ({ onNewDiary }: NewDiaryFormProps) => {
  const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    dispatch({
      type: "CHANGE_VALUE",
      payload: {
        inputName: name,
        inputValue: value
      }
    });
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onNewDiary({
      ...inputValues,
      id: Math.floor(Math.random() * 1000)
    });

    dispatch({ type: "CLEAR" });
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
