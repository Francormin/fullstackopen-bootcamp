const Logout = ({ handleUserChange }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    handleUserChange(null);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
