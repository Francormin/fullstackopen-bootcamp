import Select from "react-select";

const BirthYearForm = ({ authors, selectedName, setSelectedName, born, setBorn, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div>
      name
      <Select
        value={selectedName || ""}
        onChange={setSelectedName}
        options={authors.map(author => {
          return { value: author.name, label: author.name };
        })}
      />
    </div>
    <div>
      born
      <input
        value={born}
        onChange={({ target }) => {
          setBorn(target.value);
        }}
      />
    </div>
    <button type="submit">update author</button>
  </form>
);

export default BirthYearForm;
