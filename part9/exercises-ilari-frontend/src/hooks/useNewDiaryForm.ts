import { useReducer } from "react";
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
  return useReducer(formReducer, INITIAL_STATE);
};

export default useNewDiaryForm;
