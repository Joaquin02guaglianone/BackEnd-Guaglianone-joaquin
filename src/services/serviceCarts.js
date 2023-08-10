import { CartManagerDao } from "../dao/ManagersDao/cartManagerDao.js";

export class CartService {
    constructor() {
        this.dao = new CartManagerDao();
    }

    async create() {
        let createC = await this.dao.addcart();
        return createC;
    }

    async getById(id) {
        let getCId = await this.dao.getCartId(id);
        return getCId;
    }

    async getAll() {
        let getC = await this.dao.getCart();
        return getC;
    }

    async addProducts(cartID, prodId) {
        let createP = await this.dao.addProductsToCart(cartID, prodId);
        return createP;
    }

    async update(cartID, updatedProducts) {
        const updateP = await this.dao.actCartId(cartID, updatedProducts);
        return updateP;
    }

    async delete(cartId) {
        let deleteP = await this.dao.deleteCartId(cartId)
        return deleteP;
    }

    async deleteP(cartId, prodId) {
        let deleteP = await this.dao.deleteProductsfromCart(cartId, prodId)
        return deleteP;
    }

    async updateP(cartID, prodID, updatedProduct) {
        const updateP = await this.dao.actCartId(cartID, prodID, updatedProduct);
        return updateP;
    }
}

