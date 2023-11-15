const Notification = ({ notificationToShow }) => {
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

  return notificationToShow.error ? (
    <div style={errorStyle}>{notificationToShow.content}</div>
  ) : (
    <div style={infoStyle}>{notificationToShow.content}</div>
  );
};

export default Notification;
