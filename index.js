const express = require("express");
const app = express();
const fs = require("fs");

app.get("/productos", (req, res) => {
  const rf = fs.readFile(
    "./productos.txt",
    { encoding: "utf-8" },
    (error, data) => {
      if (error) throw error;

      console.log(typeof data);
      res.send({ data });
    }
  );
});

app.get("/productoRandom", (req, res) => {
  const producto = productos[Math.floor(Math.random() * productos.length)];

  res.send({ data: producto });
});

app.listen(8080, () => {
  console.log("hola");
});
