import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './modules/LoginForm/LoginForm.jsx';
import { RegisterForm } from './modules/RegisterForm/RegisterForm.jsx';
import { useState } from 'react';
import Welcome from './modules/Welcome/Welcome.jsx';
import { CreateNote } from './modules/Notes/CreateNote/CreateNote.jsx';



function App() {
  const [userInSession, setUserInSession] = useState(null) // estado del usuario en sesion
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoginForm
              userInSession={userInSession}
              setUserInSession={setUserInSession}
            />
          }
        />

        <Route
          path="/signUp"
          element={
            <RegisterForm />
          }
        />

        <Route
          path="/welcome"
          element={
            <Welcome
              userInSession={userInSession}
              setUserInSession={setUserInSession}
            />
          }
        />

        <Route
          path="/createNote"
          element={
            <CreateNote
              userInSession={userInSession}
              setUserInSession={setUserInSession}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
