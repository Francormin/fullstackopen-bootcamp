import { gql } from "@apollo/client";
import { BOOK_DETAILS } from "./fragments";

export const BOOK_ADDED = gql`
  subscription OnBookAdded {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
