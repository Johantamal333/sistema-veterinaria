import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./components/login.css";
import Login from "./components/login.tsx"; // Asegúrate de importar tu Login

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Ruta principal de tu aplicación */}
        <Route path="/" element={<Login />} />

        {/* Ruta para el login */}
      
      </Routes>
    </Router>
  </StrictMode>
);
