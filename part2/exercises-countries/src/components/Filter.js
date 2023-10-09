export const Filter = ({ filterHandler, filter }) => (
  <p>
    Find countries by name: <input onChange={filterHandler} value={filter} />
  </p>
);
