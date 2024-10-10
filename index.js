const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const products = require('./routes/products.route.js');

// Middleware para manejar errores al leer el archivo data.json
function getProducts() {
  const dataPath = path.join(__dirname, "data.json");
  if (fs.existsSync(dataPath)) {
    const rawData = fs.readFileSync(dataPath);
    const data = JSON.parse(rawData);
    return data[0]; // Ajusta esto según tu estructura de datos
  } else {
    throw new Error("data.json no encontrado");
  }
}

// Middleware para registrar la hora
const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

// Usa el middleware
app.use(timeLog);

// Usa la ruta de productos
app.use('/products', products);

// Ruta principal
app.get("/", (req, res) => {
  try {
    const products = getProducts();
    res.json(products); // Devuelve un JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // Manejo de errores
  }
});

// Exporta la función para Vercel
module.exports = app;

// Inicia el servidor (opcional para pruebas locales)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
