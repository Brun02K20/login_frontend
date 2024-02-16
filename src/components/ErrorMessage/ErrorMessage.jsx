import React from "react";

const ErrorMessage = ({ text }) => {
  return (
    <span
      style={{
        color: "white",
        maxWidth: "90%",
        maxHeight: "10px",
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
};

export { ErrorMessage };
