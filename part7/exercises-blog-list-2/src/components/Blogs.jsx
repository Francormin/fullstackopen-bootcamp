import { useQuery } from "react-query";

import { useSpinner } from "../hooks/useSpinner";
import { getBlogs } from "../services/blogs";

import Blog from "./Blog";
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
    <div>
      {isLoading ? (
        <Spinner className="spinner" />
      ) : status === "error" ? (
        <div>blog service not available due to problems in server</div>
      ) : (
        <div className="blogsComponent">
          <BlogForm />

          <br />
          {sortedBlogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
