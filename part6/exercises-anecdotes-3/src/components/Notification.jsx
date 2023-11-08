import { connect } from "react-redux";

const Notification = props => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  };

  return props.notification ? <div style={style}>{props.notification}</div> : null;
};

const mapStateToProps = state => {
  return {
    notification: state.notification
  };
};

const ConnectedNotification = connect(mapStateToProps, null)(Notification);
export default ConnectedNotification;
