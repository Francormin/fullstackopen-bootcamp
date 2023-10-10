export const Message = ({ message }) =>
  message.error ? (
    <div
      style={{
        color: "red",
        background: "lightgrey",
        fontSize: 16,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10
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
        padding: 10
      }}
    >
      {message.content}
    </div>
  );
