const express = require("express");
const { connection } = require("../config/config.db");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

// Obtener todas las donaciones (con callbacks)
router.get("/donaciones", verificarToken, (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  // Consulta paginada
  connection.query(
    "SELECT * FROM donaciones LIMIT ? OFFSET ?",
    [parseInt(limit), parseInt(offset)],
    (err, donaciones) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ mensaje: "Error al obtener donaciones" });
      }

      // Consulta total
      connection.query(
        "SELECT COUNT(*) AS total FROM donaciones",
        (err, countResult) => {
          if (err) {
            console.error("Error:", err);
            return res.status(500).json({ mensaje: "Error al obtener total" });
          }

          const total = countResult[0].total;
          res.json({
            data: donaciones,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
          });
        }
      );
    }
  );
});

// Crear donación (con callback)
router.post("/donaciones", (req, res) => {
  const { nombres, apellidos, empresa, articulo, descripcion, fecha_embalaje, direccion } = req.body;

  if (!nombres || !apellidos || !articulo) {
    return res.status(400).json({ mensaje: "Campos obligatorios faltantes" });
  }

  connection.query(
    "INSERT INTO donaciones SET ?",
    { nombres, apellidos, empresa, articulo, descripcion, fecha_embalaje, direccion },
    (err, result) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ mensaje: "Error al crear donación" });
      }
      res.status(201).json({
        mensaje: "Donación creada exitosamente",
        id: result.insertId
      });
    }
  );
});

// Editar donación (con callback)
router.put("/donaciones/:id", verificarToken, (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, empresa, descripcion, articulo, fecha_embalaje, direccion } = req.body;

  connection.query(
    "UPDATE donaciones SET ? WHERE id = ?",
    [{ nombres, apellidos, empresa, descripcion, articulo, fecha_embalaje, direccion }, id],
    (err, result) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ mensaje: "Error al actualizar donación" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: "Donación no encontrada" });
      }
      res.json({ mensaje: "Donación actualizada con éxito" });
    }
  );
});

// Eliminar donación (con callback)
router.delete("/donaciones/:id", verificarToken, (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM donaciones WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ mensaje: "Error al eliminar donación" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: "Donación no encontrada" });
      }
      res.json({ mensaje: "Donación eliminada con éxito" });
    }
  );
});

// Obtener donación específica (con callback)
router.get("/donaciones/:id", verificarToken, (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM donaciones WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({ mensaje: "Error en base de datos" });
      }
      if (results.length === 0) {
        return res.status(404).json({ mensaje: "Donación no encontrada" });
      }
      res.json(results[0]);
    }
  );
});
// 📌 Total de donaciones
router.get("/total", verificarToken, (req, res) => {
  connection.query(
    "SELECT COUNT(*) AS total FROM donaciones",
    (err, results) => {
      if (err) {
        console.error("❌ Error al obtener total de donaciones:", err);
        return res.status(500).json({ mensaje: "Error en el servidor" });
      }
      res.json({ total: results[0].total });
    }
  );
});
module.exports = router;