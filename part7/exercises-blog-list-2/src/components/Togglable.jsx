import { useState, forwardRef, useImperativeHandle } from "react";

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
    <div className="togglable">
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>

      <div style={showWhenVisible} className="togglableContent">
        {children}
        <button onClick={toggleVisibility}>{buttonLabel2}</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
