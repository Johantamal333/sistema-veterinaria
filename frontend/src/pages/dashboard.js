import React, { useState, useEffect } from "react";
import axios from "axios";
import './dashboard.css';

const Dashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [donaciones, setDonaciones] = useState([]);
  
  useEffect(() => {
    // Obtener datos del administrador
    const fetchAdminData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/perfil', {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Datos del administrador:', response.data); // Añadir console.log aquí
        setAdminData(response.data);
      } catch (error) {
        console.error(error.response ? error.response.data.mensaje : 'Error en el servidor');
      }
    };

    // Obtener las donaciones
    const fetchDonaciones = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donaciones');
        console.log('Donaciones:', response.data); // Añadir console.log aquí
        setDonaciones(response.data);
      } catch (error) {
        console.error(error.response ? error.response.data.mensaje : 'Error al obtener donaciones');
      }
    };

    fetchAdminData();
    fetchDonaciones();
  }, []);

  const handleAdd = (section) => {
    alert(`Añadir nuevo ${section}`);
  };

  const handleEdit = (section, id) => {
    alert(`Editar ${section} con ID ${id}`);
  };

  const handleDelete = (section, id) => {
    alert(`Eliminar ${section} con ID ${id}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Dashboard</h1>
      {adminData ? (
        <div className="admin-info">
          <h2>Información del Administrador</h2>
          <p>Username: {adminData.username}</p>
          <p>Email: {adminData.email}</p>
        </div>
      ) : (
        <p>Cargando información del administrador...</p>
      )}

      <div className="dashboard-sections">
        <div className="section">
          <h2>Administradores</h2>
          <button onClick={() => handleAdd('Administrador')}>Agregar Administrador</button>
        </div>

        <div className="section">
          <h2>Donadores</h2>
          <button onClick={() => handleAdd('Donador')}>Agregar Donador</button>
        </div>

        <div className="section">
          <h2>Pacientes</h2>
          <button onClick={() => handleAdd('Paciente')}>Agregar Paciente</button>
        </div>

        <div className="section">
          <h2>Donaciones</h2>
          <button onClick={() => handleAdd('Donación')}>Agregar Donación</button>
          <ul>
            {donaciones.length > 0 ? (
              donaciones.map((donacion) => (
                <li key={donacion.id}>
                  {donacion.nombres} {donacion.apellidos} - {donacion.articulo}
                  <button onClick={() => handleEdit('Donación', donacion.id)}>Editar</button>
                  <button onClick={() => handleDelete('Donación', donacion.id)}>Eliminar</button>
                </li>
              ))
            ) : (
              <p>No hay donaciones disponibles.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
