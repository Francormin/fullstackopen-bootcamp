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
    <div>
      <div style={hideWhenVisible}>
        <button
          onClick={toggleVisibility}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            padding: "10px",
            color: "green",
            fontWeight: "bold",
            marginBottom: "10px",
            marginTop: "10px",
            borderColor: "green"
          }}
        >
          {buttonLabel}
        </button>
      </div>

      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{buttonLabel2}</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
