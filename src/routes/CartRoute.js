import { Router } from "express";
import { CartManager } from "../CartManager.js"
import { CartManagerDao } from "../dao/ManagersDao/cartManagerDao.js";

export const cartRoute = Router();
const cartDao = new CartManagerDao();

cartRoute.post("/", async (req,res) => {
let crearCart = await cartDao.addcart();

if (crearCart) {
  return res.send("se creo el carrito");
}else {
  return res.status(400).send("ocurrio un error en la creacion de carrito")
}

})

cartRoute.get("/", async (req,res) => {
  const cartMgd = await cartDao.getCart()

  if(cartMgd) {
    return res.send(cartMgd)
  }else {
    return res.status(400).send("no se ha podido encontrar los carritos")
  }

})

cartRoute.get("/:cid", async (req,res) => {
  try{

    const id = (req.params.cid);
    const cartId = await cartDao.getCartId(id)
    res.send(cartId)
  }catch{

    res.status(500).send("no se ha encontrado el carrito solicitado")

  }
})


cartRoute.post("/:cid/product/:pid", async (req,res) => {
  const cID = (req.params.cid);
  const pID = (req.params.pid);

  const agregarAlCart = cartDao.addProductsCart(cID, pID)

  if (agregarAlCart) {
    res.send("se ha añanido el producto")
  } else {
    res.status(400).send("ha ocurrido un error al agregar el producto al carrito")
  }

})


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
