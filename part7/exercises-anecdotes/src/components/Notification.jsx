export const Notification = ({ notification }) => {
  return notification ? (
    <div>
      <p>{notification}</p>
    </div>
  ) : null;
};
