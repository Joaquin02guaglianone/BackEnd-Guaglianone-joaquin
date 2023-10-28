import { Router } from "express";
import passport from "passport";
import { CartManager } from "../CartManager.js";
import { CartManagerDao } from "../dao/ManagersDao/cartManagerDao.js";
import { getAllCarts,getCartId,createCart,createProductInCart,updateProductInCart,deleteCart,deleteProductInCart,updateCart,} from "../controllers/controlerCarts.js";
import { createTicket } from "../controllers/controllerTicket.js";
import { authToken } from "../util.js";

export const cartRoute = Router();

cartRoute.get("/", getAllCarts);
cartRoute.get("/:cid", getCartId);
cartRoute.post("/", createCart);
cartRoute.post("/:cid/product/:pid",authToken(["user", "premium"]), createProductInCart);
cartRoute.put("/:cid", updateCart);
cartRoute.put("/:cid/product/:pid",authToken(["user", "premium"]), updateProductInCart);
cartRoute.delete("/:cid", deleteCart);
cartRoute.delete("/:cid/product/:pid",authToken(["user", "premium"]), deleteProductInCart);
cartRoute.post("/:cid/purchase", createTicket);

// const cartDao = new CartManagerDao();

// cartRoute.post("/", async (req,res) => {
//   try {
//     let crearCart = await cartDao.addcart();
// if (crearCart) {
//   return res.send("se creo el carrito");
// }else {
//   return res.status(400).send("ocurrio un error en la creacion de carrito")
// }
//   } catch (error) {
//     throw new Error ("ocurrio un error en el server")
//   }

// })

// cartRoute.get("/", async (req,res) => {
//   try {
//     const cartMgd = await cartDao.getCart()

//     if(cartMgd) {
//       return res.send(cartMgd)
//     }else {
//       return res.status(400).send("no se ha podido encontrar los carritos")
//     }
//   } catch (error) {
//     throw new Error ("ocurrio un error en el server")
//   }

// })

// cartRoute.get("/:cid", async (req,res) => {
//   try{

//     const id = (req.params.cid);
//     const cartId = await cartDao.getCartId(id)
//     res.send(cartId)
//   }catch{

//     res.status(500).send("no se ha encontrado el carrito solicitado")

//   }
// })

// cartRoute.delete("/:cid", async (req,res) => {
//   try{
//     const id = (req.params.cid);
//     const cartId = await cartDao.deleteCartId(id)
//     res.send(cartId)
//   }catch{
//     res.status(500).send("no se ha encontrado el carrito solicitado")
//   }
// })

// cartRoute.put("/:cid", async (req,res) => {
//   try{
//     const updatedProducts = req.body.products
//     const cartid = (req.params.cid);
//     const cartId = await cartDao.actCartId(cartid, updatedProducts)
//     res.send(cartId)
//   }catch{

//     res.status(500).send("no se ha encontrado el carrito solicitado")

//   }
// })

// cartRoute.post("/:cid/product/:pid", async (req,res) => {
//   try {
//     const cID = (req.params.cid);
//     const pID = (req.params.pid);

//     const agregarAlCart = cartDao.addProductsToCart(cID, pID)

//     if (agregarAlCart) {
//       res.send("se ha añanido el producto")
//     } else {
//       res.status(400).send("ha ocurrido un error al agregar el producto al carrito")
//     }
//   } catch (error) {
//     throw new Error ("ocurrio un error en el server")
//   }

// })

// cartRoute.delete("/:cid/product/:pid", async (req,res) => {
//   try {
//     const cID = (req.params.cid);
//     const pID = (req.params.pid);

//     const deleteFromCart = cartDao.deleteProductsfromCart(cID, pID)

//     if (deleteFromCart) {
//       res.send("se ha añanido el producto")
//     } else {
//       res.status(400).send("ha ocurrido un error al agregar el producto al carrito")
//     }
//   } catch (error) {
//     throw new Error("ocurrio un error")
//   }

// })

// cartRoute.put("/:cid/product/:pid", async (req,res) => {
//   try {
//     const updatedProduct = req.body
//     const cID = (req.params.cid);
//     const pID = (req.params.pid);

//     const changeCart = cartDao.actProductsToCart(cID, pID, updatedProduct)

//     if (changeCart) {
//       res.send("se ha añanido el producto")
//     } else {
//       res.status(400).send("ha ocurrido un error al agregar el producto al carrito")
//     }
//   } catch (error) {
//     throw new Error ("ocurrio un error en el server")
//   }

// })

////////////////////////////////////////////////////////////////////////

//FileSystem

// const carritoManager = new CartManager("../cart.json")

// cartRoute.post('/', (req, res)=> {
//     let crearCart = carritoManager.addCart();

//     if (crearCart) {
//       return res.send("se creo el carrito");
//     } else {
//       return res.status(400).send("ocurrio un error en la creacion del carrito");
//     }
// })

// cartRoute.get('/', (req, res)=> {
//     const cart = carritoManager.getProductsCart();

//     if (cart) {
//       return res.send(cart);
//     } else {
//       return res.status(400).send("no se ha podido encontrar la informacion del carrito");
//     }
// })

// cartRoute.get('/:cid', (req, res) => {
//     try {
//     const id = parseInt(req.params.cid);
//     const cartId = carritoManager.getProductsCartId(id)
//     res.send(cartId)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send("no se ha encontrado el carrito solicitado")
//     }
// })

// cartRoute.post('/:cid/product/:pid', (req, res) => {
//     const cID = parseInt(req.params.cid);
//     const pID = parseInt(req.params.pid);
//     const productToCart = carritoManager.addProductsCart(cID, pID);

//     if (productToCart) {
//         res.send("se ha añanido el producto al carrito deseado");
//     } else {
//         res.status(404).send("ha ocurrido un error en la peticion de añadir un producto al carrito");
//     }
// });
