import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notesServices } from "../Notes/services/notes.service";

export default function Welcome({ userInSession, setUserInSession }) {
  // efecto a usar en cada pantalla, para la persistencia de login del usuario
  useEffect(() => {
    const logguedUserJSON = window.localStorage.getItem("logguedApp"); // obtengo el user d localStorage
    if (logguedUserJSON) {
      // si existe
      const user = JSON.parse(logguedUserJSON); // lo paso a objeto
      console.log("user en el efecto welcome: ", user);
      setUserInSession(user); // seteo el usuario
      notesServices.setToken(user.token); // seteo el token a usar
    }
  }, []);

  useEffect(() => {
    console.log("tablero comando: ", userInSession);
  }, [userInSession]);

  const navigate = useNavigate();
  const handleBack = () => {
    // si el usuario cierra sesion
    setUserInSession(null); // seteo usuario y token como null porque no estan en sesion
    notesServices.setToken(null);
    window.localStorage.removeItem("logguedApp"); // remover de localStorage el usuario porque no esta mas en sesion
    navigate("/");
  };

  const goToCreateNote = () => {
    navigate("/createNote");
  };

  const goToViewNotes = () => {
    navigate(`/myNotes/${userInSession.id}`);
  };

  return (
    <>
      <h1>
        Bienvenido {userInSession?.nombre} {userInSession?.apellido}
      </h1>

      <h3>Que querés hacer?</h3>

      <button onClick={() => handleBack()}>Cerrar sesion</button>
      <button onClick={() => goToCreateNote()}>Crear Tarea</button>
      <button onClick={() => goToViewNotes()}>Ver mis tareas</button>
    </>
  );
}

export { Welcome };
