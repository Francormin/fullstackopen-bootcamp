const Message = ({ message }) =>
  message.error ? (
    <div
      style={{
        color: "red",
        background: "lightgrey",
        fontSize: 16,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
      }}
    >
      {message.content}
    </div>
  ) : (
    <div
      style={{
        color: "green",
        background: "lightgrey",
        fontSize: 16,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
      }}
    >
      {message.content}
    </div>
  );

export default Message;
