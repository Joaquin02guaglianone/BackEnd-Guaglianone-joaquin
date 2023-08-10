import { productManagerDao } from "../dao/ManagersDao/productManagerDao.js";

export class ProductService {
    constructor() {
        this.dao = new productManagerDao();
    }

    async getAll(limit, page, sort, query) {
        let getP = await this.dao.getProducts(limit, page, sort, query);
        return getP;
    }

    async getById(id) {
        let getByID = await this.dao.getProductsById(id);
        return getByID;
    }

    async create(product) {
        let createP = await this.dao.addProduct(product);
        return createP;
    }

    async update(id, product) {
        const updateP = await this.dao.updateProduct(product, id);
        return updateP;
    }

    async delete(id) {
        let deleteP = await this.dao.deleteProduct(id)
        return deleteP;
    }
} 