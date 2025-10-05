const productos = [
  { id: "silla-moderna", nombre: "Silla Moderna", precio: 12000 },
  { id: "mesa-rustica", nombre: "Mesa Rústica", precio: 25000 },
  { id: "sofa-nordico", nombre: "Sofá Nórdico", precio: 48000 }
];

const express = require('express');
const productosRouter = express.Router();
const createError = require('http-errors');
const fs = require('fs/promises');
const path = require('path');
const FilePath = path.join(__dirname, '../productos.json');

const leerProductos = async() => {
  const data = await fs.readFile(FilePath, 'utf-8'); 
  return JSON.parse(data);
}


// Ruta GET /api/mascotas → devuelve todas las mascotas
productosRouter.get('/', async(req, res,next) => {
  leerProductos()
    .then((productos) => res.json(productos))
    .catch((err) => next(createError(500, "Error al leeer el archivo")))
    });

// Ruta para ver una mascota por ID
productosRouter.get('/:id', async(req, res,next) => {
  const id = req.params.id;
  leerProductos()
    .then((productos) => {
      const producto = productos.find((p) => p.id === id);
      if (!producto) 
        return next(createError(404, "Producto no encontrado"));
      res.json(producto);
    })
    .catch((err) => next(createError(500, "Error al leer el archivo")))
});  


module.exports = productos;