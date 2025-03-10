const jwt = require("jsonwebtoken");
require("dotenv").config();

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado. Token no proporcionado." });
  }

  try {
    // Verificamos el token
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Guardamos la información decodificada en el objeto de solicitud
    next(); // Continuamos con la siguiente función middleware
  } catch (err) {
    // Si el token es inválido o expirado
    return res.status(401).json({ mensaje: "Token inválido." });
  }
};

module.exports = verificarToken;
