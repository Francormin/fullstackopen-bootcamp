const authorResolver = {
  name: parent => parent.name,
  id: parent => parent.id,
  born: parent => parent.born,
  bookCount: parent => parent.bookCount
};

module.exports = authorResolver;
