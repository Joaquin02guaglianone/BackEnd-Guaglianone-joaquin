import { CartService } from "../services/serviceCarts.js";

const cartService = new CartService()

export const getAllCarts = async (req, res) => {
    try {
        let cart = await cartService.getAll();
    
        if (cart) {
          res.status(200).send(cart);
        } else {
          res.status(404).send("Fail to get the carts");
        }
      } catch (error) {
        res.status(500).send("Internal server error" + error);
      }
};

export const getCartId = async (req, res) => {
    try {
        let id = req.params.cid;
        let cartId = await cartService.getById(id);
    
        if (cartId) {
          res.status(200).send(cartId);
        } else {
          res.status(404).send("Fail to get the requested cart");
        }
      } catch (error) {
        res.status(500).send("Internal server error");
      }
};

export const createCart = async (req, res) => {
    try {
        const createCart = await cartService.create();
    
        if (createCart) {
          res.status(200).send("Cart created");
        } else {
          res.status(400).send("Failed to create cart");
        }
      } catch (error) {
        res.status(500).send("Internal server error");
      }
};

export const createProductInCart = async (req, res) => {
    try {
        const cID = req.params.cid;
        const pID = req.params.pid;
        const productToCart = await cartService.addProducts(cID, pID);
    
        if (req.user.role === "premium") {
          const product = await productService.getById(pID)

        if (product.owner === req.user.email) {
        return res.status(401).send("A premium user cannot add their own product to the cart.");
      }
        }

        if (productToCart) {
          res.send("Product added to cart");
        } else if (cID === undefined) {
          res.status(404).send("Fail to get the requested cart");
        } else if (pID === undefined) {
          res.status(404).send("Fail to get the requested product in the cart");
        } else {
          res.status(404).send("Fail to get the requested cart and product");
        }
      } catch (error) {
        res.status(500).send("Internal server error" + error);
      }
};

export const updateCart = async (req, res) => {
    try {
        const cartID = req.params.cid;
        const updatedProducts = req.body.products;
    
        const updateCart = await cartService.update(cartID, updatedProducts);
    
        if (updateCart) {
          res.status(200).send("Cart updated successfully");
        } else {
          res.status(404).send("Cart not found or could not be updated");
        }
      } catch (error) {
        res.status(500).send("Internal server error: " + error);
      }
};

export const updateProductInCart = async (req, res) => {
    try {
        const cID = req.params.cid;
        const pID = req.params.pid;
        const { quantity } = req.body;
        
        const updateQuantity = await cartService.updateP(cID, pID, quantity);
    
        if (updateQuantity) {
          res.status(200).send("Product updated successfully");
        } else {
          res.status(404).send("Product not found or could not be updated");
        }
      } catch (error) {
        res.status(500).send("Internal server error: " + error);
      }
};

export const deleteCart = async (req, res) => {
    try {
        let cID = req.params.cid;
        let emptyCart = await cartService.delete(cID)
    
        if(emptyCart) {
          res.status(200).send("Cart empty!")
        }else{
          res.status(404).send("None cart")
        }
      } catch (error) {
        res.status(500).send("Internal server error" + error);
      }
};

export const deleteProductInCart = async (req, res) => {
    try {
        const cID = req.params.cid;
        const pID = req.params.pid;
      
        const deleteProductInCart = await cartService.deleteP(cID, pID)
        if(deleteProductInCart) {
          res.status(200).send("Product deleted")
        }else{
          res.status(404).send("None product")
        }
      } catch (error) {
        res.status(500).send("Interval server error")
      }
};