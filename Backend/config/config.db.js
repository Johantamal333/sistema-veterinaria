const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql");
const { promisify } = require("util"); // Para convertir callbacks a promesas

// Crear la conexión
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Convertir los métodos a promesas
connection.query = promisify(connection.query).bind(connection);

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar:", err);
    return;
  }
  console.log("✅ Conexión exitosa a la BD");
});

module.exports = { connection };