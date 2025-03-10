import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import './home.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Usar useNavigate para redirección

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Validación simple de formularios
    if (!username || !password) {
      setErrorMessage('Por favor, complete todos los campos.');
      setLoading(false);
      return;
    }

    try {
      // Cambiar la URL al nuevo endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });

      // Verificar si la respuesta es exitosa
      if (response.data.token) {
        // Guardar el token en el almacenamiento local (localStorage)
        localStorage.setItem('authToken', response.data.token);

        // Redirigir al Dashboard usando navigate
        setErrorMessage(''); // Limpiar cualquier mensaje de error
        navigate('/dashboard'); // Redirigir usando navigate
      } else {
        setErrorMessage(response.data.mensaje);
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.mensaje : 'Error en el servidor');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1>Bienvenido al Sistema de Gestión de Veterinaria</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Cargando...' : 'Iniciar sesión'}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Home;
