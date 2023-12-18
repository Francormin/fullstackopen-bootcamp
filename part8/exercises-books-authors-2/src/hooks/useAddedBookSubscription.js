import { useSubscription } from "@apollo/client";
import { ALL_AUTHORS, BOOK_ADDED } from "../queries";

export const useAddedBookSubscription = client => {
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const { bookAdded } = subscriptionData.data;

      window.alert(`${bookAdded.title} added`);

      client.cache.modify({
        fields: {
          allBooks(allBooks) {
            return allBooks.concat(bookAdded);
          },

          allAuthors() {
            const { allAuthors } = client.readQuery({ query: ALL_AUTHORS });
            const existingAuthor = allAuthors.find(author => author.name === bookAdded.author.name);

            if (!existingAuthor) {
              allAuthors.push({
                name: bookAdded.author.name,
                bookCount: 1
              });
            } else {
              existingAuthor.bookCount += 1;
            }

            return allAuthors;
          }
        }
      });
    }
  });
};
