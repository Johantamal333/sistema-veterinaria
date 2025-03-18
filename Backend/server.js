const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/adminRoutes");
const donacionesRoutes = require("./routes/donacionesRoutes");
const donadoresRoutes = require("./routes/donadoresRoutes");    
const pacientesRoutes = require("./routes/pacientesRoutes");    
require("dotenv").config();
const setupSwagger = require("./config/swagger.js");
 // 📌 Importa la configuración de Swagger

const app = express();
app.use(cors());
app.use(express.json());

// Configurar Swagger correctamente
setupSwagger(app); // ✅ Usa la configuración unificada

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donaciones", donacionesRoutes); // Corrección aquí
app.use("/api/donadores", donadoresRoutes);   // Corrección aquí
app.use("/api/pacientes", pacientesRoutes);   // Corrección aquí

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
