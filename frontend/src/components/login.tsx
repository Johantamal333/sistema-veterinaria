import { useState } from "react";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState(""); // Cambié 'email' a 'username'
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
        body: JSON.stringify({ username, password }), // Cambié 'email' a 'username'
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
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-tr from-blue-900 to-blue-500">
      <div className="bg-image w-full sm:w-1/2 md:w-9/12 lg:w-1/2 mx-3 md:mx-5 lg:mx-0 shadow-md flex flex-col md:flex-row items-center rounded z-10 overflow-hidden bg-center bg-cover bg-blue-600">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-opacity-25 bg-blue-600 backdrop">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white my-2 md:my-0">
            Bienvenido
          </h1>
          <p className="mb-2 text-white hidden md:block font-mono">
            Sistema Gestion Veterinaria
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center bg-white py-5 md:py-8 px-4">
          <h3 className="mb-4 font-bold text-3xl flex items-center text-blue-500">
            Bienvenido
          </h3>
          <form onSubmit={handleSubmit} className="px-3 flex flex-col justify-center items-center w-full gap-3">
            {error && <p className="text-red-500">{error}</p>}
            <input
              type="text"
              value={username} // Cambié 'email' a 'username'
              onChange={(e) => setUsername(e.target.value)} // Cambié 'setEmail' a 'setUsername'
              placeholder="Usuario"
              className="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-2 w-full rounded border border-gray-300 shadow-sm text-base placeholder-gray-500 placeholder-opacity-50 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:ring rounded px-3 py-1">
              <svg
                className="w-5 h-5 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                ></path>
              </svg>
              <p className="ml-1 text-lg">Inicia Sesión</p>
            </button>
          </form>
          <p className="text-gray-800 text-sm mt-2">
            ¿No tienes cuenta?   
            <a href="Register" className="text-green-500 hover:text-green-600 mt-3 focus:outline-none font-bold underline">
                Registrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
