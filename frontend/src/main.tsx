import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./components/login.css";
import Login from "./components/login.tsx"; // Asegúrate de importar tu Login
import Dashboard from "./components/dashboard.tsx";
import Register from "./components/register.tsx";

//vistas admin


import AdminVer from "./components/adminViews/adminver.tsx";
import AdminEditar from "./components/adminViews/admineditar.tsx";
//import AdminEliminar from "./components/adminViews/admineliminar.tsx";

//vistas donaciones
import DonacionesCrear from "./components/donacionesViews/donacionescrear.tsx";
import DonacionesVer from "./components/donacionesViews/donacionesver.tsx";
import DonacionesEditar from "./components/donacionesViews/donacioneseditar.tsx";


//vistas pacientes
import PacientesCrear from "./components/pacientesViews/pacientescrear.tsx";
import PacientesVer from "./components/pacientesViews/pacientesver.tsx";
import PacientesEditar from "./components/pacientesViews/pacienteseditar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Ruta principal de tu aplicación */}
        <Route path="/" element={<Login />} />
         {/* Ruta principal de registro */}
         <Route path="register" element={<Register />} />

        {/* Ruta para el dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Ruta para admin*/}
        <Route path="adminver" element={<AdminVer />} />
        <Route path="/admineditar/:id" element={<AdminEditar />} />


        
        
         {/* Ruta para donaciones*/}
        
         <Route path="donacionesver" element={<DonacionesVer />} />
       
        <Route path="donacioneseditar/:id" element={<DonacionesEditar />} />
        <Route path="donacionescrear" element={<DonacionesCrear/> } />
      

        {/* Ruta para donaciones*/}
        <Route path="pacientesver" element={<PacientesVer />} />
        <Route path="pacienteseditar/:id" element={<PacientesEditar />} />
        <Route path="pacientescrear" element={<PacientesCrear />} />
        
       
       
        
        

      
      </Routes>
    </Router>
  </StrictMode>
);
