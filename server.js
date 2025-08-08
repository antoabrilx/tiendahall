// archivo: server.js (o el que tengas para tu backend)

const express = require('express');
const app = express();
const port = 3001;  // o el que uses

const mysql = require('mysql2/promise');

// Configuración de conexión (ajustá con tus datos)
const dbConfig = {
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_password',
  database: 'proyecto_vinos',
};

app.get('/api/vinos', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM vinos'); // tabla vinos
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
