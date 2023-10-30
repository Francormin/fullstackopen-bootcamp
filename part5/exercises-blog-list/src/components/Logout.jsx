import PropTypes from "prop-types";

const Logout = ({ handleUserChange }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    handleUserChange(null);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

Logout.propTypes = {
  handleUserChange: PropTypes.func.isRequired
};

export default Logout;
