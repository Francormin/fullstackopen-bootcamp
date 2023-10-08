export const Filter = ({ filterHandler, filter }) => (
  <p>
    Filter shown with: <input onChange={filterHandler} value={filter} />
  </p>
);
