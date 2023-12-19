import { gql } from "@apollo/client";
import { BOOK_DETAILS } from "./fragments";

export const ALL_AUTHORS = gql`
  query GetAllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query GetAllBooks {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      username
      favoriteGenre
      id
    }
  }
`;
