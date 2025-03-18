const express = require("express");
const { connection } = require("../config/config.db");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

// Obtener todas las donaciones
router.get("/donaciones", verificarToken, async (req, res) => {
  try {
    connection.query("SELECT id, nombres, apellidos, empresa, descripcion, articulo, fecha_embalaje, direccion, imagen FROM donaciones", (err, rows) => {
      if (err) {
        return res.status(500).json({ mensaje: "Error al obtener donaciones" });
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener donaciones" });
  }
});

// Crear una nueva donación
router.post("/donaciones", verificarToken, async (req, res) => {
  const { nombres, apellidos, empresa, descripcion, articulo, fecha_embalaje, direccion, imagen } = req.body;
  try {
    connection.query(
      "INSERT INTO donaciones (nombres, apellidos, empresa, descripcion, articulo, fecha_embalaje, direccion, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nombres, apellidos, empresa, descripcion, articulo, fecha_embalaje, direccion, imagen],
      (err, result) => {
        if (err) {
          return res.status(500).json({ mensaje: "Error al crear donación" });
        }
        res.status(201).json({ mensaje: "Donación creada con éxito", id: result.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear donación" });
  }
});

// Editar una donación
router.put("/donaciones/:id", verificarToken, async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, empresa, descripcion, articulo, fecha_embalaje, direccion, imagen } = req.body;

  try {
    connection.query(
      "UPDATE donaciones SET nombres = ?, apellidos = ?, empresa = ?, descripcion = ?, articulo = ?, fecha_embalaje = ?, direccion = ?, imagen = ? WHERE id = ?",
      [nombres, apellidos, empresa, descripcion, articulo, fecha_embalaje, direccion, imagen, id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ mensaje: "Error al actualizar donación" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ mensaje: "Donación no encontrada" });
        }
        res.json({ mensaje: "Donación actualizada con éxito" });
      }
    );
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar donación" });
  }
});

// Eliminar una donación
router.delete("/donaciones/:id", verificarToken, async (req, res) => {
  const { id } = req.params;

  try {
    connection.query("DELETE FROM donaciones WHERE id = ?", [id], (err, result) => {
      if (err) {
        return res.status(500).json({ mensaje: "Error al eliminar donación" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: "Donación no encontrada" });
      }
      res.json({ mensaje: "Donación eliminada con éxito" });
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar donación" });
  }
});

module.exports = router;
