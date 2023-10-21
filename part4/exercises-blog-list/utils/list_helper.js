const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.length
    ? blogs.map(blog => blog.likes).reduce((accumulator, currentValue) => accumulator + currentValue)
    : 0;
};

const favoriteBlog = blogs => {
  return blogs.length
    ? blogs
        .map(blog => {
          return {
            title: blog.title,
            author: blog.author,
            likes: blog.likes
          };
        })
        .reduce((accumulator, currentValue) => (accumulator.likes >= currentValue.likes ? accumulator : currentValue))
    : {};
};

const mostBlogs = blogs => {
  if (!blogs.length) return {};

  const authorsWithBlogs = {};
  blogs.forEach(blog => {
    authorsWithBlogs[blog.author] ? (authorsWithBlogs[blog.author] += 1) : (authorsWithBlogs[blog.author] = 1);
  });

  const result = Object.entries(authorsWithBlogs).reduce((accumulator, currentValue) => {
    return accumulator[1] >= currentValue[1] ? accumulator : currentValue;
  });

  const objectToReturn = { author: result[0], blogs: result[1] };
  return objectToReturn;
};

const mostLikes = blogs => {
  if (!blogs.length) return {};

  const authorsWithLikes = {};
  blogs.forEach(blog => {
    authorsWithLikes[blog.author]
      ? (authorsWithLikes[blog.author] += blog.likes)
      : (authorsWithLikes[blog.author] = blog.likes);
  });

  const result = Object.entries(authorsWithLikes).reduce((accumulator, currentValue) => {
    return accumulator[1] >= currentValue[1] ? accumulator : currentValue;
  });

  const objectToReturn = { author: result[0], likes: result[1] };
  return objectToReturn;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
