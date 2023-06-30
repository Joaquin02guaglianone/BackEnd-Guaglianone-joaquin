import CartModel from "../models/cart.js";

class CartManagerDao {
  constructor() {
    this.cartModel = CartModel;
  }

  async addcart() {
    try {
      const newProductCart = await this.cartModel.create({products : []})
      console.log(newProductCart)
      return newProductCart;
    } catch (error) {
      console.log("error al crear el carrito");
    }
  }

  async getCartId(id) {
    const cartId = await this.cartModel.findById(id);
    if (!cartId) {
      return "No se encontro el carrito";
    }
    return cartId;
  }

  async getCart() {
    try {
      const cartsMgd = await this.cartModel.find();
      return cartsMgd;
    } catch (error) {
      throw new error("no se pudieron encontrar carritos");
    }
  }

  async addProductsToCart(cartId, prodId) {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      const existingProductIndex = cart.products.findIndex(prod => prod.product === prodId);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
      } else {
        const newProduct = { product: prodId, quantity: 1 };
        cart.products.push(newProduct);
      }
      await cart.save();
      return true;
    } catch (error) {
      console.log("Error al agregar producto al carrito", error);
      return false;
    }
  }
}

export {CartManagerDao}
