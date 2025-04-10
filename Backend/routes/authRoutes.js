const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connection } = require("../config/config.db");
const verificarToken = require("../middleware/authMiddleware"); // Importamos la conexión
require("dotenv").config();

const router = express.Router();

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }

    const query = "SELECT * FROM administradores WHERE username = ?";

    connection.query(query, [username], async (err, rows) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ mensaje: "Error del servidor" });
        }

        if (rows.length === 0) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }

        const user = rows[0];

        // Verificar si el password en la BD es una cadena
        if (typeof user.password !== "string") {
            console.error("El password almacenado no es válido:", user.password);
            return res.status(500).json({ mensaje: "Error interno con las credenciales" });
        }

        console.log("Contraseña ingresada:", password);
        console.log("Contraseña en BD:", user.password);

        try {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("Resultado de bcrypt.compare:", isMatch);

            if (!isMatch) {
                return res.status(400).json({ mensaje: "Contraseña incorrecta" });
            }

            // Generar JWT
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            res.status(200).json({ mensaje: "Autenticación exitosa", token });
        } catch (error) {
            console.error("Error al comparar contraseñas:", error);
            res.status(500).json({ mensaje: "Error al procesar la contraseña" });
        }
    });
    router.get("/me", verificarToken, (req, res) => {
        try {
          if (!req.user) return res.status(401).json({ mensaje: "No autorizado" });
          
          res.json({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email
          });
        } catch (error) {
          console.error("Error en /me:", error);
          res.status(500).json({ mensaje: "Error al obtener usuario" });
        }
      });
    

});
router.get("/me", verificarToken, (req, res) => {
    connection.query(
      "SELECT id, username, email FROM administradores WHERE id = ?",
      [req.user.id],
      (err, results) => {
        if (err) {
          console.error("Error en la consulta:", err);
          return res.status(500).json({ error: "Error del servidor" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(results[0]);
      }
    );
  });

module.exports = router;
