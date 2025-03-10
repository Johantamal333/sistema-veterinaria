const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
