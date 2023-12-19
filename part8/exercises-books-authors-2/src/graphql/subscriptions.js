import { gql } from "@apollo/client";

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
