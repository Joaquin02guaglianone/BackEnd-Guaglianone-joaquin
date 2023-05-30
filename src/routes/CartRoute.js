import { Router } from "express";
import { CartManager } from "./CartManager.js"

export const cartRoute = Router();
const carritoManager = new CartManager("./cart.json")

cartRoute.post('/', (req, res)=> {
    carritoManager.addCart()
    res.send("Cart created")
})

cartRoute.get('/', (req, res)=> {
    const cart = carritoManager.getProductsCart()
    res.send(cart)
})

cartRoute.get('/:cid', (req, res) => {
    const id = parseInt(req.params.cid);
    const cartId = carritoManager.getProductsCartId(id)
    res.send(cartId)
})

cartRoute.post('/:cid/product/:pid', (req, res) => {
    const cID = parseInt(req.params.cid);
    const pID = parseInt(req.params.pid);
    const productToCart = carritoManager.addProductsCart(cID, pID);

    if (productToCart) {
        res.send("Product added to cart");
    } else {
        res.status(404).send("Error"); // Cambiado a status 404 para indicar error
    }
});
