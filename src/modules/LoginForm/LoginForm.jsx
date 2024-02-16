import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { json, useNavigate, useSearchParams } from "react-router-dom";

import "./LoginForm.css";
import { Controller, useForm } from "react-hook-form";
import { InputBox } from "../../components/InputBox/InputBox.jsx";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage.jsx";
import axios from "axios";
import { notesServices } from "../Notes/services/notes.service.js";

const LoginForm = ({ userInSession, setUserInSession }) => {
  const navigate = useNavigate();
  const {
    reset,
    register,
    setValue,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    console.log("Usuario en sesion: ", userInSession);
  }, [userInSession]);

  const [responseError, setResponseError] = useState("");

  const onSubmit = async (data) => {
    setResponseError("");
    console.log(data);
    const response = await axios.post(
      `http://localhost:4001/api/loginForm/usuarios/login`,
      data
    );

    if (response.data.error) {
      setResponseError(response.data.error);
      return;
    }
    setResponseError("");
    setUserInSession(response.data); // seteo el usuario en sesion
    window.localStorage.setItem("logguedApp", JSON.stringify(response.data)); // guardo el usuario en localStorage para persistencia de sesion
    notesServices.setToken(response.data.token); // seteo el token a usar
    navigate("/welcome");
  };

  return (
    <div className="body-login">
      <div className="login-box">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="login-header">Login</h2>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                  message: "Dirección de correo electrónico no válida",
                },
              }}
              render={({ field }) => (
                <InputBox
                  biIcon="bi-envelope-fill"
                  inputType="email"
                  placeholder="Ingresá tu email"
                  field={field}
                  label="Email"
                />
              )}
            />
            {errors.email && <ErrorMessage text={errors.email.message} />}
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Controller
              name="password"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                maxLength: {
                  value: 15,
                  message: "Máximo 15 caracteres",
                },
                minLength: {
                  value: 8,
                  message: "Mínimo 8 caracteres",
                },
              }}
              render={({ field }) => (
                <InputBox
                  biIcon="bi-lock-fill"
                  inputType="password"
                  placeholder="Ingresá tu password"
                  field={field}
                  label="Password"
                />
              )}
            />
            {errors.password && <ErrorMessage text={errors.password.message} />}
          </Form.Group>
          {responseError && <ErrorMessage text={responseError} />}

          <div className="remember-forgot">
            {/* <label>
              <input type="checkbox" name="" id="check" />
              Recordarme
            </label> */}
            <a href="#">Olvidaste tu contraseña?</a>
          </div>

          <button className="submit-login-button">Login</button>
          <div className="register-link">
            <p>
              No tenés una cuenta?{" "}
              <a onClick={() => navigate("/signUp")}>Regístrate</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
};

export { LoginForm };
