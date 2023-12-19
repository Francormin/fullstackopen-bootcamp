import { useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "../graphql/subscriptions";

export const useAddedBookSubscription = client => {
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { bookAdded } = subscriptionData.data;

      window.alert(`${bookAdded.title} added`);

      client.cache.modify({
        fields: {
          allBooks(existingBooks = []) {
            return [...existingBooks, bookAdded];
          },

          allAuthors(existingAuthors = []) {
            const updatedAuthors = [...existingAuthors];
            const existingAuthorIndex = updatedAuthors.findIndex(author => author.name === bookAdded.author.name);

            if (existingAuthorIndex === -1) {
              updatedAuthors.push({
                name: bookAdded.author.name,
                bookCount: 1
              });
            } else {
              updatedAuthors[existingAuthorIndex] = {
                ...updatedAuthors[existingAuthorIndex],
                bookCount: updatedAuthors[existingAuthorIndex].bookCount + 1
              };
            }

            return updatedAuthors;
          }
        }
      });
    }
  });
};
