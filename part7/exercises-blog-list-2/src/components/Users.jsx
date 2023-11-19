import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { useSpinner } from "../hooks/useSpinner";
import { getUsers } from "../services/users";

import Spinner from "./Spinner";

const Users = () => {
  const isLoading = useSpinner(500);

  const { data: users, status } = useQuery("users", getUsers, {
    refetchOnWindowFocus: false,
    retry: 1
  });

  return (
    <div>
      {isLoading ? (
        <Spinner className="spinner" />
      ) : status === "error" ? (
        <div>user service not available due to problems in server</div>
      ) : (
        <div className="usersComponent">
          <h2>Users</h2>

          <table>
            <tbody>
              <tr>
                <th></th>
                <th>blogs created</th>
              </tr>
              {users?.map(user => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
