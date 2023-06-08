import { Router } from "express";
import { Product } from "../ProductManager.js";
import { socketServer } from "../app.js";

export const proRoute = Router();
const productManager = new Product("../productos.json");

proRoute.get("/", (req, res) => {
  try {
  const limit = parseInt(req.query.limit);
  let products = productManager.getProducts();

  if (!isNaN(limit)) {
    products = products.slice(0, limit);
  }
  res.send(JSON.stringify(products));
} catch (error) {
   console.log(error)
   res.status(500).send("error en el servidor")
}
});

proRoute.get("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductsByID(productId);
  if (product) {
    res.send(JSON.stringify(product));
  } else {
    res.status(500).send("no se pudo encontrar el producto solicitado")
  }
});

proRoute.post("/", (req, res) => {
const {
  title,
  description,
  price,
  thumbnail,
  code,
  stock,
  category
} = req.body;

if(!title, !description, !price, !thumbnail, !code, !stock, !category){
  return res.status(400).send("You have not completed all the fields")
}else{
  productManager.addProducts(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  );

  const productAct = productManager.getProducts()
  socketServer.emit("productAct", productAct)

  productManager.archivarProds();
  return res.status(200).send("productos añadidos");
}
  })

proRoute.put("/:pid", (req, res) => {
  try {
  const prodId = parseInt(req.params.pid)
  const updProduct = req.body;
  productManager.updateProduct(prodId, updProduct);

  const productAct = productManager.getProducts()
  socketServer.emit("productAct", productAct)

  res.send("producto modificado correctamente")
  } catch (error) {
    console.log(error)
    res.status(400).send("no se ha encontrado el producto que desea modificar")
  }
})

proRoute.delete("/:pid", (req, res) => {
  const delProdId = parseInt(req.params.pid)
  const delProd = productManager.deleteProduct(delProdId)

  const productAct = productManager.getProducts()
  socketServer.emit("productAct", productAct)

  if (!delProd) {
    res.send("se ha borrado el producto")
  } else {
    res.status(400).send("no se ha encontrado el producto que desea borrar")
  }
})

