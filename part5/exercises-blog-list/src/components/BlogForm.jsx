import Togglable from "./Togglable";

const BlogForm = ({ title, handleTitleChange, url, handleUrlChange, handleSubmit, message, ref }) => (
  <Togglable buttonLabel="New blog" ref={ref}>
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Title:{" "}
          <input type="text" value={title} name="Title" onChange={({ target }) => handleTitleChange(target.value)} />
        </div>

        <div>
          Url: <input type="text" value={url} name="Url" onChange={({ target }) => handleUrlChange(target.value)} />
        </div>

        <button type="submit" disabled={!title || !url || message.content}>
          Create
        </button>
      </form>
    </div>
  </Togglable>
);

export default BlogForm;
