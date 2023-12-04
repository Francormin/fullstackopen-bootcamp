import { useState } from "react";
import Select from "react-select";
import { useMutation, useQuery } from "@apollo/client";

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = props => {
  const [selectedName, setSelectedName] = useState(null);
  const [born, setBorn] = useState("");

  const { loading, data } = useQuery(ALL_AUTHORS);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  if (loading) {
    return <div>loading...</div>;
  }

  const authors = data?.allAuthors || [];

  const submit = async event => {
    event.preventDefault();

    if (selectedName === null || born === "") {
      return;
    }

    await updateAuthor({
      variables: {
        name: selectedName.value,
        setBornTo: Number(born)
      }
    });

    setSelectedName(null);
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

      <form onSubmit={submit}>
        <div>
          name
          <Select
            value={selectedName || ""}
            onChange={setSelectedName}
            options={authors.map(a => {
              return { value: a.name, label: a.name };
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
    </div>
  );
};

export default Authors;
