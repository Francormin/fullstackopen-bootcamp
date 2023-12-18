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

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
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

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
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

export const BOOK_ADDED = gql`
  subscription OnBookAdded {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;
