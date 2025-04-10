const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/adminRoutes");
const donacionesRoutes = require("./routes/donacionesRoutes");
const donadoresRoutes = require("./routes/donadoresRoutes");    
const pacientesRoutes = require("./routes/pacientesRoutes"); 
const dueñosRoutes = require("./routes/dueñosRoutes");    
require("dotenv").config();
const setupSwagger = require("./config/swagger.js");
 // 📌 Importa la configuración de Swagger

const app = express();
app.use(cors());
app.use(express.json());
// Configuración específica para CORS
const corsOptions = {
    origin: 'http://localhost:5173', // URL exacta de tu frontend
    credentials: true, // Permite cookies/tokens
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  app.use(cors(corsOptions));
  
  // Asegúrate de incluir estos headers manualmente en las respuestas
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

// Configurar Swagger correctamente
setupSwagger(app); // ✅ Usa la configuración unificada

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donaciones", donacionesRoutes); // Corrección aquí
app.use("/api/donadores", donadoresRoutes);   // Corrección aquí
app.use("/api/pacientes", pacientesRoutes);   // Corrección aquí
app.use("/api/dueños", dueñosRoutes);   // Corrección aquí

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
