import { connect } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = props => {
  return (
    <div style={{ marginBottom: 10 }}>
      All
      <input type="radio" name="filter" onChange={() => props.filterChange("ALL")} defaultChecked />
      Semi-Popular
      <input type="radio" name="filter" onChange={() => props.filterChange("SEMIPOPULAR")} />
      Popular
      <input type="radio" name="filter" onChange={() => props.filterChange("POPULAR")} />
    </div>
  );
};

const ConnectedFilter = connect(null, { filterChange })(Filter);
export default ConnectedFilter;
