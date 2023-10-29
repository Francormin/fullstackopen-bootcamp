import Togglable from "./Togglable";

const Blog = ({ blog, userName }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <span>
        {blog.title}
        <Togglable buttonLabel="View" buttonLabel2="Hide">
          <p>Url: {blog.url}</p>
          <p>
            Likes: {blog.likes} <button>like</button>
          </p>
          <p>Author: {blog.author.name || userName}</p>
        </Togglable>
      </span>
    </div>
  );
};

export default Blog;
