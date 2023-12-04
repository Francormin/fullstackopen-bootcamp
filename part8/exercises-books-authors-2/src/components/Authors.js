import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = props => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data?.allAuthors || [];

  const updateBorn = async () => {
    if (name === "" || born === "") {
      return;
    }

    await updateAuthor({ variables: { name, setBornTo: Number(born) } });

    setName("");
    setBorn("");
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>

      <form
        onSubmit={event => {
          event.preventDefault();
          updateBorn();
        }}
      >
        <div>
          name
          <select
            value={name === "" ? "Select author" : name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          >
            <option disabled={true}>Select author</option>
            {authors.map(a => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
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
    </div>
  );
};

export default Authors;
