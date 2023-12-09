const BookTable = ({ books, filterFunction }) => {
  const filteredBooks = filterFunction ? books.filter(filterFunction) : books;

  return (
    <table>
      <tbody>
        <tr>
          <th>title</th>
          <th>author</th>
          <th>published</th>
        </tr>
        {filteredBooks.map(book => (
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
