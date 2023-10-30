import PropTypes from "prop-types";

const Message = ({ message }) => {
  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 16,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  };

  const infoStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 16,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  };

  return message.error ? (
    <div style={errorStyle}>{message.content}</div>
  ) : (
    <div style={infoStyle}>{message.content}</div>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
