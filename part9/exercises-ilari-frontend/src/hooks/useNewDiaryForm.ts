import { useReducer } from "react";
import { createNewDiary } from "../services/createNewDiary";
import { NewDiaryEntry } from "../types";

interface NewDiaryFormState {
  inputValues: NewDiaryEntry;
}

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

const INITIAL_STATE = {
  date: "",
  weather: "",
  visibility: "",
  comment: ""
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

const useNewDiaryForm = () => {
  const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    dispatch({
      type: "CHANGE_VALUE",
      payload: {
        inputName: name,
        inputValue: value
      }
    });
  };

  const addNewDiary = (newDiaryEntry: NewDiaryEntry) => {
    const newDiary = createNewDiary(newDiaryEntry);
    return newDiary;
  };

  const resetForm = () => {
    dispatch({
      type: "CLEAR"
    });
  };

  return {
    inputValues,
    handleInputChange,
    resetForm,
    addNewDiary
  };
};

export default useNewDiaryForm;
