import { useState } from "react";

import useAuthorsQuery from "../hooks/useAuthorsQuery";
import useUpdateAuthorMutation from "../hooks/useUpdateAuthorMutation";
import AuthorTable from "./AuthorTable";
import BirthYearForm from "./BirthYearForm";

const Authors = ({ show, setError, token }) => {
  const [selectedName, setSelectedName] = useState(null);
  const [born, setBorn] = useState("");

  const { loading, authors } = useAuthorsQuery();
  const { updateAuthor } = useUpdateAuthorMutation();

  const submit = event => {
    event.preventDefault();

    if (selectedName === null) {
      setError("There is no selected author");

      return setTimeout(() => {
        setError(null);
      }, 5000);
    }

    updateAuthor({
      variables: {
        name: selectedName?.value,
        setBornTo: Number(born)
      }
    })
      .then(() => {
        setError(null);
        setSelectedName(null);
        setBorn("");
      })
      .catch(({ networkError }) => {
        setError(networkError.result.errors[0].message);

        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };

  if (loading) {
    return <div>loading...</div>;
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>authors</h2>
      <AuthorTable authors={authors} />

      {token && (
        <div>
          <h2>Set birthyear</h2>
          <BirthYearForm
            authors={authors}
            selectedName={selectedName}
            setSelectedName={setSelectedName}
            born={born}
            setBorn={setBorn}
            onSubmit={submit}
          />
        </div>
      )}
    </div>
  );
};

export default Authors;
