import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/reducers/loginReducer";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
