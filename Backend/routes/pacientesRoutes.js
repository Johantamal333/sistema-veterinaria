const express = require("express");
const { connection } = require("../config/config.db");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Obtener todos los pacientes
router.get("/pacientes", verificarToken, async (req, res) => {
  try {
    connection.query(
      "SELECT id, nombre, edad FROM pacientes",
      (err, rows) => {
        if (err) {
          console.error("❌ Error en la consulta:", err);
          return res.status(500).json({ mensaje: "Error al obtener pacientes" });
        }
        res.json(rows);
      }
    );
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pacientes" });
  }
});

// 📌 Crear un nuevo paciente
router.post("/pacientes", verificarToken, async (req, res) => {
  const { nombre, edad } = req.body;
  try {
    connection.query(
      "INSERT INTO pacientes (nombre, edad) VALUES (?, ?)",
      [nombre, edad],
      (err, result) => {
        if (err) {
          return res.status(500).json({ mensaje: "Error al crear paciente" });
        }
        res.status(201).json({ mensaje: "Paciente creado con éxito", id: result.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear paciente" });
  }
});

// 📌 Editar un paciente
router.put("/pacientes/:id", verificarToken, async (req, res) => {
  const { id } = req.params;
  const { nombre, edad } = req.body;

  try {
    connection.query(
      "UPDATE pacientes SET nombre = ?, edad = ? WHERE id = ?",
      [nombre, edad, id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ mensaje: "Error al actualizar paciente" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ mensaje: "Paciente no encontrado" });
        }
        res.json({ mensaje: "Paciente actualizado con éxito" });
      }
    );
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar paciente" });
  }
});

// 📌 Eliminar un paciente
router.delete("/pacientes/:id", verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    connection.query(
      "DELETE FROM pacientes WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ mensaje: "Error al eliminar paciente" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ mensaje: "Paciente no encontrado" });
        }
        res.json({ mensaje: "Paciente eliminado con éxito" });
      }
    );
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar paciente" });
  }
});

module.exports = router;
