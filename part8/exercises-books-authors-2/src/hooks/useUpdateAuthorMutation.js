import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR } from "../graphql/mutations";

const useUpdateAuthorMutation = () => {
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    // Newer approach
    update: (cache, response) => {
      cache.modify({
        fields: {
          allAuthors: (existingAuthors = []) => {
            return existingAuthors.map(author =>
              author.name === response.data.editAuthor.name ? response.data.editAuthor : author
            );
          }
        }
      });
    }
    // Older approach
    // update: (cache, response) => {
    //   cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    //     return {
    //       allAuthors: allAuthors.map(author =>
    //         author.name === response.data.editAuthor.name ? response.data.editAuthor : author
    //       )
    //     };
    //   });
    // }
  });

  return {
    updateAuthor
  };
};

export default useUpdateAuthorMutation;
