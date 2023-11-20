import { useNotificationValue } from "../context/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 16,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 20
  };

  const infoStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 16,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 20
  };

  return (
    <div>
      {!notification.content ? null : notification.error ? (
        <div style={errorStyle}>{notification.content}</div>
      ) : (
        <div style={infoStyle}>{notification.content}</div>
      )}
    </div>
  );
};

export default Notification;
