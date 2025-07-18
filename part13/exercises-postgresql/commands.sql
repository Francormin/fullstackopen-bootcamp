CREATE TABLE IF NOT EXISTS blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(100),
  url VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0
);

DELETE FROM blogs;

INSERT INTO blogs (author, url, title, likes)
VALUES
  ('John Doe', 'https://example.com/blog1', 'First Blog Post', 7),
  ('Jane Smith', 'https://example.com/blog2', 'Second Blog Post', 12),
  ('Alice Johnson', 'https://example.com/blog3', 'Third Blog Post', 0),
  ('Bob Brown', 'https://example.com/blog4', 'Fourth Blog Post', 3),
  ('Charlie White', 'https://example.com/blog5', 'Fifth Blog Post', 0);
