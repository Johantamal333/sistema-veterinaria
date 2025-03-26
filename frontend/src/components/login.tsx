import { useState } from "react";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validar campos
    if (!username || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Realizar la solicitud al backend
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        setError(data.mensaje || "Error al iniciar sesión");
        return;
      }

      console.log("Sesión iniciada con éxito:", data);

      // Aquí puedes manejar el almacenamiento del token y redireccionamiento
      // Ejemplo: Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      // Redirigir a una página protegida (por ejemplo, al dashboard)
      window.location.href = "/dashboard"; // Cambia esto según tu ruta
    } catch (error) {
      setError("Error de conexión con el servidor");
      console.error("Error en la conexión:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Iniciar Sesión</h2>
        {error && <p className="login-error">{error}</p>}

        <div className="login-field">
          <label className="login-label">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="login-field">
          <label className="login-label">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>

      <div className="login-welcome">
        <h2>Bienvenidos a nuestra Veterinaria</h2>
        <p>
          En nuestra veterinaria nos importa el bienestar de tus mascotas. Nos
          esforzamos por ofrecer un servicio de calidad con amor y dedicación.
          Inicia sesión para acceder a nuestros servicios y gestionar tu cuenta.
        </p>
      </div>
    </div>
  );
};

export default Login;
