import { gql } from "@apollo/client";

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
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query GetBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
    }
  }
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
