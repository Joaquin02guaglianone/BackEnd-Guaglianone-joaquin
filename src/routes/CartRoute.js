import { Router } from "express";
import { CartManager } from "../CartManager.js"

export const cartRoute = Router();
const carritoManager = new CartManager("../cart.json")

cartRoute.post('/', (req, res)=> {
    let crearCart = carritoManager.addCart();

    if (crearCart) {
      return res.send("se creo el carrito");
    } else {
      return res.status(400).send("ocurrio un error en la creacion del carrito");
    }
})

cartRoute.get('/', (req, res)=> {
    const cart = carritoManager.getProductsCart();

    if (cart) {
      return res.send(cart);
    } else {
      return res.status(400).send("no se ha podido encontrar la informacion del carrito");
    }
})

cartRoute.get('/:cid', (req, res) => {
    try {
    const id = parseInt(req.params.cid);
    const cartId = carritoManager.getProductsCartId(id)
    res.send(cartId)
    } catch (error) {
        console.log(error)
        res.status(500).send("no se ha encontrado el carrito solicitado")
    }
})

cartRoute.post('/:cid/product/:pid', (req, res) => {
    const cID = parseInt(req.params.cid);
    const pID = parseInt(req.params.pid);
    const productToCart = carritoManager.addProductsCart(cID, pID);

    if (productToCart) {
        res.send("se ha añanido el producto al carrito deseado");
    } else {
        res.status(404).send("ha ocurrido un error en la peticion de añadir un producto al carrito");
    }
});
