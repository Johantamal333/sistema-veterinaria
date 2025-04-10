const express = require("express");
const { connection } = require("../config/config.db");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Obtener todos los pacientes
router.get("/pacientes", verificarToken, async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;

  try {
    // Consulta paginada
    connection.query(
      "SELECT SQL_CALC_FOUND_ROWS id, nombre, especie, raza, edad FROM pacientes LIMIT ? OFFSET ?",
      [parseInt(limit), parseInt(offset)],
      (err, data) => {
        if (err) {
          console.error("❌ Error en la consulta de pacientes:", err);
          return res.status(500).json({ mensaje: "Error al obtener pacientes" });
        }

        // Consulta para obtener el total
        connection.query("SELECT FOUND_ROWS() AS total", (err, totalResult) => {
          if (err) {
            console.error("❌ Error al obtener total de pacientes:", err);
            return res.status(500).json({ mensaje: "Error al obtener el total" });
          }

          const total = totalResult[0]?.total || 0;
          res.json({
            data,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            totalRecords: total
          });
        });
      }
    );
  } catch (error) {
    console.error("❌ Error general:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

// 📌 Crear un nuevo paciente
router.post("/pacientes", verificarToken, async (req, res) => {
  const { nombre, especie, raza, edad } = req.body;

  try {
    connection.query(
      "INSERT INTO pacientes (nombre, especie, raza, edad) VALUES (?, ?, ?, ?)",
      [nombre, especie, raza, edad],
      (err, result) => {
        if (err) {
          console.error("❌ Error al crear paciente:", err);
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
  const { nombre, especie, raza, edad } = req.body;

  try {
    connection.query(
      "UPDATE pacientes SET nombre = ?, especie = ?, raza = ?, edad = ? WHERE id = ?",
      [nombre, especie, raza, edad, id],
      (err, result) => {
        if (err) {
          console.error("❌ Error al actualizar paciente:", err);
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
          console.error("❌ Error al eliminar paciente:", err);
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
//
router.get("/pacientes/:id", verificarToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    connection.query(
      "SELECT * FROM pacientes WHERE id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ mensaje: "Error en base de datos" });
        }
        
        if (results.length === 0) {
          return res.status(404).json({ mensaje: "paciente no encontrado" });
        }
        
        res.json(results[0]);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error del servidor" });
  }
});
// 📌 Total de pacientes
// En pacientesRoutes.js y donacionesRoutes.js agregar
router.get("/total", verificarToken, (req, res) => {
  connection.query(
    "SELECT COUNT(*) AS total FROM pacientes", // Mejor práctica usar COUNT(columna)
    (err, results) => {
      if (err) {
        console.error("Error:", err);
        return res.status(500).json({
          codigo: "ERR_DB",
          mensaje: "Error en base de datos"
        });
      }
      res.json({ total: results[0].total || 0 });
    }
  );
});
module.exports = router;
