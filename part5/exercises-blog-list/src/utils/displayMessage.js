const displayMessage = (handleMessageChange, message, error) => {
  if (error) {
    handleMessageChange({
      content: message,
      error
    });
  } else {
    handleMessageChange({
      content: message,
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
