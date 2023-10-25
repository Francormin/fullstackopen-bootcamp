const Error = ({ message }) => (
  <div
    style={{
      color: "red",
      background: "lightgrey",
      fontSize: 16,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }}
  >
    {message}
  </div>
);

export default Error;
