import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_CURRENT_USER } from "../queries";

const Recommendations = props => {
  const result = useQuery(ALL_BOOKS);
  const currentUser = useQuery(GET_CURRENT_USER);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data?.allBooks || [];
  const me = currentUser.data?.me || {};

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{me.favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter(book => book.genres.includes(me.favoriteGenre))
            .map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
