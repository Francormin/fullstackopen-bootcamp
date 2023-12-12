import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS, BOOKS_BY_GENRE } from "../queries";

const useCreateBookMutation = ({ onCompleted, onError }) => {
  const [createBook] = useMutation(CREATE_BOOK, {
    onCompleted,
    onError,
    update: (cache, response) => {
      const newBook = response.data.addBook;

      // Update the cache for the ALL_BOOKS query
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(newBook)
        };
      });

      // Update the cache for the BOOKS_BY_GENRE query with the specific genre
      newBook.genres.forEach(genre => {
        cache.updateQuery({ query: BOOKS_BY_GENRE, variables: { genre } }, ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(newBook)
          };
        });
      });

      // Update the cache for the ALL_AUTHORS query
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        // Assuming that newBook.author holds the author information
        const updatedAuthors = [...allAuthors];

        // Check if the author is already in the list
        const existingAuthor = updatedAuthors.find(author => author.name === newBook.author);

        // If the author exists, increment the book count; otherwise, add a new author
        if (existingAuthor) {
          existingAuthor.bookCount += 1;
        } else {
          updatedAuthors.push({
            name: newBook.author,
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
