import React from "react";
import { Form } from "react-bootstrap";

const InputBox = ({ biIcon, inputType, placeholder, field, label }) => {
  return (
    <div className="input-box">
      <span className="icon">
        <i className={`bi ${biIcon}`} style={{ color: "#fff" }}></i>
      </span>
      <input
        className="input-login-form"
        type={`${inputType}`}
        placeholder={`${placeholder}`}
        {...field}
      />
      <Form.Label className="login-label">{label}</Form.Label>
    </div>
  );
};

export { InputBox };
