import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const blogStyle = {
    padding: 10,
    border: "1px solid",
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLabel="View" buttonLabel2="Hide">
        <p>Url: {blog.url}</p>
        <p>
          Likes: {blog.likes} <button>Like</button>
        </p>
        <p>Author: {blog.author.name}</p>
      </Togglable>
    </div>
  );
};

export default Blog;
