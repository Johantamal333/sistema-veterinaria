const express = require("express");
const { connection } = require("../config/config.db");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Obtener todos los donantes
router.get("/donadores", verificarToken, async (req, res) => {
  try {
    connection.query(
      "SELECT id, nombre, apellido, telefono, email, direccion, fecha_registro FROM donadores",
      (err, rows) => {
        if (err) {
          console.error("❌ Error en la consulta:", err);
          return res.status(500).json({ mensaje: "Error al obtener donadores" });
        }
        res.json(rows);
      }
    );
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ mensaje: "Error en el servidor al obtener donadores" });
  }
});

// 📌 Crear un nuevo donante
router.post("/donadores", verificarToken, async (req, res) => {
  const { nombre, apellido, telefono, email, direccion } = req.body;

  if (!nombre || !apellido || !telefono || !email || !direccion) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    connection.query(
      "INSERT INTO donadores (nombre, apellido, telefono, email, direccion, fecha_registro) VALUES (?, ?, ?, ?, ?, NOW())",
      [nombre, apellido, telefono, email, direccion],
      (err, result) => {
        if (err) {
          console.error("❌ Error en la inserción:", err);
          return res.status(500).json({ mensaje: "Error al crear donante" });
        }
        res.status(201).json({ mensaje: "Donante creado con éxito", id: result.insertId });
      }
    );
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ mensaje: "Error en el servidor al crear donante" });
  }
});

// 📌 Editar un donante
router.put("/donadores/:id", verificarToken, async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, email, direccion } = req.body;

  if (!nombre || !apellido || !telefono || !email || !direccion) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    connection.query(
      "UPDATE donadores SET nombre = ?, apellido = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?",
      [nombre, apellido, telefono, email, direccion, id],
      (err, result) => {
        if (err) {
          console.error("❌ Error en la actualización:", err);
          return res.status(500).json({ mensaje: "Error al actualizar donante" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ mensaje: "Donante no encontrado" });
        }
        res.json({ mensaje: "Donante actualizado con éxito" });
      }
    );
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ mensaje: "Error en el servidor al actualizar donante" });
  }
});

// 📌 Eliminar un donante
router.delete("/donadores/:id", verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    connection.query(
      "DELETE FROM donadores WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          console.error("❌ Error en la eliminación:", err);
          return res.status(500).json({ mensaje: "Error al eliminar donante" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ mensaje: "Donante no encontrado" });
        }
        res.json({ mensaje: "Donante eliminado con éxito" });
      }
    );
  } catch (error) {
    console.error("❌ Error en el servidor:", error);
    res.status(500).json({ mensaje: "Error en el servidor al eliminar donante" });
  }
});

module.exports = router;
