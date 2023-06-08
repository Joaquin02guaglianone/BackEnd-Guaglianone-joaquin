import { error } from "console";
import fsProds from "fs";
const path = './productos.json';

export class Product {
  constructor(path) {
    this.Prods = [];
    this.id = 1;
    this.path = path;
    this.loadProducts()
  }

  addProducts(title, description, price, thumbnail, code, stock, category) {

    if (title && description && price && thumbnail && code && stock && category) {

      let codexist = this.Prods.some((product) => {
        return product.code === code;
      });
      if (codexist){
        throw new error("el codigo esta repetido")
      } else {
        let id = this.id++;
        const newProd= {
          id,
          title: String(title),
          price: Number(price),
          thumbnail: String(thumbnail),
          code: String(code),
          stock: String(stock),
          category: Array(category)
        }
        this.Prods.push(newProd)
      }
    } else {
      throw new Error("debe completar todas los campos");
    }
  }

  getProducts() {
    return this.Prods;
  }

  getProductsByID(id) {
   const idP = parseInt(id);
 
   const idExist = this.Prods.find(productId => productId.id === idP)
 
   if (!idExist) {
     return console.log("no existe el id");
   }
 
   return idExist;
 }

  deleteProduct(id) {
    const indice = this.Prods.findIndex((prodid) => {
      return prodid.id === id;
    });
    console.log(this.Prods)
    console.log(indice)

    if (indice >= 0) {
      const borrarProd = this.Prods.splice(indice, 1);

      return ("se ha borrado el producto:", borrarProd), this.archivarProds();
    } else {
      return "no se ha podido borrar porque no se encontrado el id";
    }
  }

  updateProduct(id, newproduct) {
    const idproducts = this.Prods.findIndex((idproduct) => idproduct.id === id);
    
    console.log(idproducts)

    if (idproducts <= 0) {
      return "Product not found";

    }
    const productUpdated = {
      ...this.Prods[idproducts],

      ...newproduct,
    };
    this.Prods[idproducts] = productUpdated;
    this.archivarProds();
  }

  archivarProds() {
   const jsonData = JSON.stringify(this.Prods);
   fsProds.writeFile(this.path, jsonData, "utf-8", (error=> {
    if (error) {
      throw new Error("los productos no se han podido cargar correctamente" + error)
    } else {
      return "se han podido cargar los datos de forma correcta"
    }
   }))
 } 
  
 loadProducts() {
  if (fsProds.existsSync(this.path)) {
    const jsonProducts = fsProds.readFileSync(this.path, "utf-8")
    this.Prods = JSON.parse(jsonProducts);
  } else {
    this.archivarProds();
  }
}

}


// ProductManager.addProducts(
//   "uncharted 1",
//   "disco fisico",
//   "$16000",
//   "imagen del uncharted 1",
//   1,
//   "2000"
// );

//  ProductManager.addProducts(
//    "uncharted 2",
//    "disco fisico",
//    "$10500",
//    "imagen del uncharted 2",
//    2,
//    "1400"
//  );

// ProductManager.addProducts(
//   "uncharted 3",
//   "disco fisico",
//   "$11000",
//   "imagen del uncharted 3",
//   3,
//   "1600"
// );

// ProductManager.addProducts(
//   "uncharted 4",
//   "disco fisico",
//   "$13000",
//   "imagen del uncharted 4",
//   4,
//   "1100"
// );

// ProductManager.addProducts(
//   "uncharted lost legacy",
//   "disco fisico",
//   "$15000",
//   "imagen del uncharted lost legacy",
//   5,
//   "800"
// );

// ProductManager.addProducts(
//   "uncharted collection",
//   "disco fisico",
//   "$17000",
//   "imagen de la uncharted collection",
//   6,
//   "500"
// );

// ProductManager.addProducts(
//   "watch dogs 1",
//   "disco fisico",
//   "$16000",
//   "imagen del watch dogs 2",
//   7,
//   "3500"
// );

// ProductManager.getProductsByID();

// //  ProductManager.deleteProduct(5)

// ProductManager.getProducts();

// // console.log(ProductManager.getProducts())

// ProductManager.updateProduct(7, {
//   title: "code vein",
//   description: "disco fisico",
//   price: "$13000",
//   thumbnail: "imagen del code vein",
//   code: "7",
//   stock: "2900",
// });

//node script.js
