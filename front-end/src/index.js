import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import "./index.css";

import App from "./App";
import Login from "./views/Login";
import Register from "./views/Register";
import Grupos from "./views/Grupos";
import Links from "./views/Links";
import Comentarios from "./views/Comentarios";
import User from "./views/User";
import UsersAdmin from "./views/UsersAdmin";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="registrar" element={<Register />} />
      <Route path="home" element={<Grupos />} />
      <Route path="grupo/:id" element={<Links />} />
      <Route path="grupo/:id/link/:lid" element={<Comentarios />} />
      <Route path="usuario" element={<User />} />
      <Route path="admin/usuarios" element={<UsersAdmin />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
