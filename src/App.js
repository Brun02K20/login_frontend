import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginForm } from './modules/LoginForm/LoginForm.jsx';
import { RegisterForm } from './modules/RegisterForm/RegisterForm.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoginForm />
          }
        />

        <Route
          path="/signUp"
          element={
            <RegisterForm />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
