const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta para obtener el contenido de un archivo JSON
app.get("/get-json/app", (req, res) => {
  const filePath = path.join(__dirname, "public", "app-backup.json"); // Ruta de tu archivo JSON

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo JSON" });
    }
    res.json(JSON.parse(data)); // Devuelve el contenido del archivo JSON
  });
});

app.get("/get-json/usuarios", (req, res) => {
  const filePath = path.join(__dirname, "public", "usuarios-backup.json"); // Ruta de tu archivo JSON

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo JSON" });
    }
    res.json(JSON.parse(data)); // Devuelve el contenido del archivo JSON
  });
});

// Rutas para la descarga de archivos
app.get("/get-json/app/download", (req, res) => {
  const filePath = path.join(__dirname, "public", "app-backup.json");
  res.download(filePath);
});

app.get("/get-json/usuarios/download", (req, res) => {
  const filePath = path.join(__dirname, "public", "usuarios-backup.json");
  res.download(filePath);
});

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
