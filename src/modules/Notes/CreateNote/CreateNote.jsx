import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputBox } from "../../../components/InputBox/InputBox.jsx";
import { Form } from "react-bootstrap";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage.jsx";
import axios from "axios";
import { notesServices } from "../services/notes.service.js";

const CreateNote = ({ userInSession, setUserInSession }) => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const logguedUserJSON = window.localStorage.getItem("logguedApp");
    if (logguedUserJSON) {
      const user = JSON.parse(logguedUserJSON);
      setUserInSession(user);
      notesServices.setToken(user.token);
    }
  }, []);

  const [responseError, setResponseError] = useState("");

  const onSubmit = async (data) => {
    data.userId = userInSession.id;
    console.log(data);
    const response = await notesServices.createNote(data);

    if (response.error || response.data.error) {
      setResponseError(response.error);
      return;
    }
    setResponseError("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Creat Note</h2>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Controller
            name="titulo"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El campo es requerido",
              },
            }}
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Ingresá título d tarjta"
                {...field}
              />
            )}
          />
          {errors.titulo && <span>{errors.titulo.message}</span>}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput2">
          <Controller
            name="contenido"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El campo es requerido",
              },
            }}
            render={({ field }) => (
              <Form.Control
                type="text"
                placeholder="Ingresá contenido d tarjta"
                {...field}
              />
            )}
          />
          {errors.contenido && <span>{errors.contenido.message}</span>}
        </Form.Group>
        {responseError && <span>{responseError}</span>}

        <button>NVIAR</button>
      </Form>

      <button onClick={() => navigate("/welcome")}>VOLVER</button>
    </>
  );
};

export { CreateNote };
