import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { useSpinner } from "../hooks/useSpinner";
import { getBlogs } from "../services/blogs";

import BlogForm from "./BlogForm";
import Spinner from "./Spinner";
import "./Blogs.css";

const Blogs = () => {
  const isLoading = useSpinner(500);

  const { data: blogs, status } = useQuery("blogs", getBlogs, {
    refetchOnWindowFocus: false,
    retry: 1
  });

  const sortedBlogs = blogs?.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1;
    }
    if (a.likes > b.likes) {
      return -1;
    }
    return 0;
  });

  return (
    <div className="blogsOuterContainer">
      {isLoading ? (
        <Spinner className="spinner" />
      ) : status === "error" ? (
        <div>blog service not available due to problems in server</div>
      ) : (
        <div className="blogsInnerContainer">
          <BlogForm />

          <br />
          <Table striped>
            <tbody>
              {sortedBlogs?.map(blog => (
                <tr key={blog.id}>
                  <td>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Blogs;
