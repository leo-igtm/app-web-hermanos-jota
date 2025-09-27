const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');

// Middleware para parsear JSON
app.use(express.json());

// Middleware global para loguear método y URL
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Rutas
app.use('/api/productos', productRoutes);

// Ruta 404 (no encontrada)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejador de errores centralizado
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// Levantar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
