const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const products = require('./routes/products.route.js')

function getProducts() {
  // Lee el archivo data.json
  const dataPath = path.join(__dirname, "data.json");
  const rawData = fs.readFileSync(dataPath);

  // Convierte el contenido en un objeto JavaScript
  const data = JSON.parse(rawData);

  // Devuelve los primeros dos usuarios como ejemplo
  return data[0]//.users.slice(0, 2);
}


app.use('/products', products)


//get all
app.get("/", (req, res) => {
  const products = getProducts();
  res.send(products);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
