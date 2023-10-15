/**
 * A component for filtering countries by name.
 *
 * @param {function} filterHandler - The event handler for filtering.
 * @param {string} filter - The current filter value.
 * @returns {JSX.Element} - The JSX element for the filter component.
 */
export const Filter = ({ filterHandler, filter }) => (
  <p>
    {/* Input field for filtering */}
    Find countries by name: <input onChange={filterHandler} value={filter} />
  </p>
);
