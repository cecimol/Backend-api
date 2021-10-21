const { privateDecrypt } = require("crypto");
const fs = require("fs");

const writeFileAsync = async (nombre, objects) => {
  if (objects) {
    await fs.promises.writeFile(
      `./${nombre}.txt`,
      JSON.stringify(objects, null, 2),
      "utf-8"
    );
  } else {
    await fs.promises.writeFile(`./${nombre}.txt`, "", "utf-8");
  }
};

const readFileAsync = async (nombre) => {
  let file = await fs.promises.readFile(`./${nombre}.txt`, "utf-8");
  return file;
};

class Contenedor {
  constructor(nombreArchivo) {
    this.objects = [];
    this.nombreArchivo = nombreArchivo;
    this.id = 0;
  }

  async save(object) {
    try {
      const savedFile = await readFileAsync(this.nombreArchivo);
      if (savedFile && savedFile.length >= 0) {
        const fileData = JSON.parse(savedFile);
        this.id = fileData[fileData.length - 1].id + 1;
        object.id = this.id;
        fileData.push(object);
        await writeFileAsync(this.nombreArchivo, fileData);
      } else {
        this.id = 1;
        object.id = this.id;
        this.objects.push(object);
        await writeFileAsync(this.nombreArchivo, this.objects);
      }

      console.log(`El id del producto agregado es: ${this.id}`);
    } catch (error) {
      console.log("Error guardando elementos", error);
    }
  }

  async getById(id) {
    try {
      const savedFile = await readFileAsync(this.nombreArchivo);
      if (savedFile && savedFile.length >= 0) {
        const fileData = await JSON.parse(savedFile);
        const object = fileData.find((object) => object.id === id);
        if (object) {
          console.log(`El elemento obtenido con el id ${id} es ${object}`);
        } else {
          console.log(`No se encontraron elementos con el id ${id}`);
        }
      } else {
        console.log(`No se encontraron elementos con el id ${id}`);
      }
    } catch (error) {
      console.log("Error obteniendo elemento", error);
    }
  }

  async getAll() {
    try {
      const savedFile = await readFileAsync(this.nombreArchivo);
      if (savedFile && savedFile.length >= 0) {
        const fileData = JSON.parse(savedFile);
        console.log(`Los elementos almacenados en el archivo son ${fileData}`);
      } else {
        console.log("No hay elementos en el archivo");
      }
    } catch (error) {
      console.log("Error al obtener los elementos", error);
    }
  }

  async deleteById(id) {
    try {
      const savedFile = await readFileAsync(this.nombreArchivo);
      if (savedFile && savedFile.length >= 0) {
        const fileData = JSON.parse(savedFile);
        const newFileData = fileData.filter((object) => object.id !== id);
        await writeFileAsync(this.nombreArchivo, newFileData);
        console.log(
          `Se ha eliminado el elemento de id ${id}, los objetos restantes son ${newFileData}`
        );
      }
    } catch (error) {
      console.log("Error eliminando elemento", error);
    }
  }

  async deleteAll() {
    try {
      await writeFileAsync(this.nombreArchivo);
      console.log("Todos los elementos han sido eliminados");
    } catch (error) {
      console.log("Error eliminando todos los elementos", error);
    }
  }
}

const productos = new Contenedor("productos");
productos.save({
  title: "Fernet Branca",
  price: 650,
  url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.RyIUPbKiA5mf4N-rptU_3AHaJ4%26pid%3DApi&f=1",
});
productos.save({
  title: "Gancia",
  price: 500,
  url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.RyIUPbKiA5mf4N-rptU_3AHaJ4%26pid%3DApi&f=1",
});
productos.save({
  title: "Campari",
  price: 600,
  url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.RyIUPbKiA5mf4N-rptU_3AHaJ4%26pid%3DApi&f=1",
});
// //productos.getAll();
// productos.getById(1);
// productos.deleteById(1);
// productos.deleteAll();
