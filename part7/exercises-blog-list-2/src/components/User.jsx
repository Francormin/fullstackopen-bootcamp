import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { useSpinner } from "./../hooks/useSpinner";
import { getUser } from "../services/users";

import Spinner from "./Spinner";

const User = () => {
  const { id } = useParams();
  const isLoading = useSpinner();

  const { data: user } = useQuery("user", () => getUser(id), {
    refetchOnWindowFocus: false,
    retry: 1
  });

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : user ? (
        <div>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>user not found</div>
      )}
    </div>
  );
};

export default User;
