import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "react-bootstrap/Button";

const Togglable = forwardRef(({ children, buttonLabel, buttonLabel2 }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{buttonLabel}</Button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <Button variant="danger" onClick={toggleVisibility}>
          {buttonLabel2}
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
