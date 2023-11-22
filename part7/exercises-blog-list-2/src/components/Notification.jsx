import Alert from "react-bootstrap/Alert";
import { useNotificationValue } from "../context/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  return (
    <div>
      {!notification.content ? null : notification.error ? (
        <Alert variant="danger">{notification.content}</Alert>
      ) : (
        <Alert variant="success">{notification.content}</Alert>
      )}
    </div>
  );
};

export default Notification;
