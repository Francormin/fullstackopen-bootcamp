const displayMessage = (handleMessageChange, payload, error) => {
  if (error) {
    handleMessageChange({
      content: payload,
      error
    });
  } else {
    handleMessageChange({
      content: `A new blog ${payload.title} by ${payload.authorName} added`,
      error
    });
  }

  setTimeout(() => {
    handleMessageChange({
      content: null,
      error: false
    });
  }, 5000);
};

export default displayMessage;
