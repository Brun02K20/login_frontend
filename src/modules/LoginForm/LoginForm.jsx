import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/signUp")}>IR A REGISTRO</button>;
};

export { LoginForm };
