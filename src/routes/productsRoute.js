import { Router } from "express";
import { Product } from "../ProductManager.js";
import { productManagerDao } from "../dao/ManagersDao/productManagerDao.js";
import { socketServer } from "../app.js";
import productModel from "../dao/models/products.js";

export const proRoute = Router();

const productsDao = new productManagerDao();

proRoute.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const sort = (req.query.sort)
    const query = (req.query.query)

    let productsmgd = await productsDao.getProducts(limit, page, sort, query);

  //  let productsJSON = productsmgd.docs.map(p=> p.toJSON())

  //  const context = {
  //   productos : productsmgd,
  //   productsDocs : productsJSON
  //  };
    // const productAct = productsDao.getProducts()
    // socketServer.emit("productAct", productAct);
       
      res.send(productsmgd)
  } catch {
    console.log(error);
    res.status(500).send("error en el servidor");
  }
});

proRoute.get("/:pid", async (req, res) => {
  const productmgdID = (req.params.pid);
  const productmgd = await productsDao.getProductsById(productmgdID);

  // const productAct = productsDao.getProducts()
  // socketServer.emit("productAct", productAct);

  if (productmgd) {
    res.send(JSON.stringify(productmgd));
  } else {
    res.status(500).send("no se pudo encontrar el producto solicitado");
  }
});

proRoute.post("/", async (req, res) => {
try {
  
  let body = req.body;

  let addProduct = await productsDao.addProduct(body);

  console.log(addProduct)

  if (addProduct) {
    // const productAct = productsDao.getProducts();
    // socketServer.emit("productAct", productAct);
    return res.status(200).send("productos añadidos");
  } else {
    res.status(400).send("no se pudo agregar el producto")
  }
  
} catch (error) {
  res.status(500).send("error del server");
}

});

proRoute.put("/:pid", async (req, res) => {
  try {
    const prodMgdID = parseInt(req.params.pid);
    const updatedProdMgd = req.body;
    const updatedProductMgd = await productsDao.updateProduct(
      prodMgdID,
      updatedProdMgd
    );

    // const productAct = productsDao.getProducts();
    // socketServer.emit("productAct", productAct);

    res.status(200).send("productos actualizados", updatedProductMgd);
  } catch {
    res
      .status(400)
      .send("se ha producido un error y no se encontro el producto");
  }
});

proRoute.delete("/:pid", async (req, res) => {
  const delProdMgdID = parseInt(req.params.pid);
  const delproductMgd = await productsDao.deleteProduct(delProdMgdID);

  // const productAct = productsDao.getProducts();
  // socketServer.emit("productAct", productAct);

  if (!delproductMgd) {
    res.send("se ha borrado el producto");
  } else {
    res.status(400).send("no se ha encontrado el producto que desea borrar");
  }
});

//fileSystem

// const productManager = new Product("../productos.json");

// proRoute.get("/", (req, res) => {
//   try {
//   const limit = parseInt(req.query.limit);
//   let products = productManager.getProducts();
//   if (!isNaN(limit)) {
//     products = products.slice(0, limit);
//   }
//   res.send(JSON.stringify(products));
// } catch (error) {
//    console.log(error)
//    res.status(500).send("error en el servidor")
// }
// });

// proRoute.get("/:pid", (req, res) => {
//   const productId = parseInt(req.params.pid);
//   const product = productManager.getProductsByID(productId);
//   if (product) {
//     res.send(JSON.stringify(product));
//   } else {
//     res.status(500).send("no se pudo encontrar el producto solicitado")
//   }
// });

// proRoute.post("/", (req, res) => {
// const {
//   title,
//   description,
//   price,
//   thumbnail,
//   code,
//   stock,
//   category
// } = req.body;

// if(!title, !description, !price, !thumbnail, !code, !stock, !category){
//   return res.status(400).send("You have not completed all the fields")

// }else{
//   productManager.addProducts(
//     title,
//     description,
//     price,
//     thumbnail,
//     code,
//     stock,
//     category
//   );

//   const productAct = productManager.getProducts()
//   socketServer.emit("productAct", productAct)

//   productManager.archivarProds();
//   return res.status(200).send("productos añadidos");
// }
//   })

// proRoute.put("/:pid", (req, res) => {
//   try {
//   const prodId = parseInt(req.params.pid)
//   const updProduct = req.body;
//   productManager.updateProduct(prodId, updProduct);

//   const productAct = productManager.getProducts()
//   socketServer.emit("productAct", productAct)

//   res.send("producto modificado correctamente")
//   } catch (error) {
//     console.log(error)
//     res.status(400).send("no se ha encontrado el producto que desea modificar")
//   }
// })

// proRoute.delete("/:pid", (req, res) => {
//   const delProdId = parseInt(req.params.pid)
//   const delProd = productManager.deleteProduct(delProdId)

//   const productAct = productManager.getProducts()
//   socketServer.emit("productAct", productAct)

//   if (!delProd) {
//     res.send("se ha borrado el producto")
//   } else {
//     res.status(400).send("no se ha encontrado el producto que desea borrar")
//   }
// })
