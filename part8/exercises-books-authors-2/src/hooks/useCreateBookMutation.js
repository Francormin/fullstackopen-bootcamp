import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const useCreateBookMutation = ({ onCompleted, onError }) => {
  const [createBook] = useMutation(CREATE_BOOK, {
    onCompleted,
    onError,
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook)
        };
      });

      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        // Assuming that response.data.addBook.author holds the author information
        const updatedAuthors = [...allAuthors];

        // Check if the author is already in the list
        const existingAuthor = updatedAuthors.find(author => author.name === response.data.addBook.author);

        // If the author exists, increment the book count; otherwise, add a new author
        if (existingAuthor) {
          existingAuthor.bookCount += 1;
        } else {
          updatedAuthors.push({
            name: response.data.addBook.author,
            bookCount: 1
          });
        }

        return {
          allAuthors: updatedAuthors
        };
      });
    }
  });

  return {
    createBook
  };
};

export default useCreateBookMutation;
