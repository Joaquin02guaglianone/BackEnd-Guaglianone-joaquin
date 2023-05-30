import { Router } from "express";
import { Product } from "./ProductManager.js";


export const proRoute = Router();
const productManager = new Product("./productos.json");

proRoute.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);
  let products = productManager.getProducts();

  if (!isNaN(limit)) {
    products = products.slice(0, limit);
  }
  res.send(JSON.stringify(products));
  console.log(products)
});

proRoute.get("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductsByID(productId);
  if (product) {
    res.send(JSON.stringify(product));
  } else {
    res.status(404)
  }
});

proRoute.post("/", (req, res) => {
 const {title, description, price, thumbnail, code, stock, category} = req.body;

  productManager.addProducts(title, description, price, thumbnail, code, stock, category);
  res.send("productos agregados correctamente")
})

proRoute.put("/:pid", (req, res) => {
  const prodId = parseInt(req.params.pid)
  const updProduct = req.body;
  productManager.updateProduct(prodId, updProduct);
  res.send("producto modificado correctamente")
})

proRoute.delete("/:pid", (req, res) => {
  const delProdId = parseInt(req.params.pid)
  const delProd = productManager.deleteProduct(delProdId)
  if (!delProd) {
    res.send("se ha boorado el producto")
  } else {
    res.send("no se ha encontrado el producto que desea borrar")
  }
})

