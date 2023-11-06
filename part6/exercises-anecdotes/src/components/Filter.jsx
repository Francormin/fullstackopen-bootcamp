import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: 10 }}>
      All
      <input type="radio" name="filter" onChange={() => dispatch(filterChange("ALL"))} defaultChecked />
      Semi-Popular
      <input type="radio" name="filter" onChange={() => dispatch(filterChange("SEMIPOPULAR"))} />
      Popular
      <input type="radio" name="filter" onChange={() => dispatch(filterChange("POPULAR"))} />
    </div>
  );
};

export default Filter;
