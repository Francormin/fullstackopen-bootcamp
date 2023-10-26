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
        {blog.title} {blog.author.name || userName} <button>View</button>
      </span>
    </div>
  );
};

export default Blog;
