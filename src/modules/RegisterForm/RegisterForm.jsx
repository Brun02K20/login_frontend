import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/")}>IR A LOGIN</button>;
};

export { RegisterForm };
