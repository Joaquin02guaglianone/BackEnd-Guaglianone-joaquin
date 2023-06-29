import productModel from "../models/products.js";

class productManagerDao {
  constructor() {
    this.productModel = productModel;
  }

  async addProduct(producto) {
    try {
      const newProduct = await this.productModel.create(producto);
      return newProduct;
    } catch {
      throw new error("hubo un fallo al agregar el producto");
    }
  }

  async getProductsById(productId) {
    try {
      const productFind = await this.productModel.findById(productId);
      if (!productFind) {
        throw new Error("Product not found");
      }
      return productFind;
    } catch (error) {
      throw new Error("ocurrio un error y no se ha encontrado el producto");
    }
  }

  async deleteProduct(productId) {
    try {
      const productDelete = await this.productModel.findByIdAndDelete(
        productId
      );
      if (!productDelete) {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw new Error(
        "no se ha podido encontrar y borrar el producto debido a un error"
      );
    }
  }

  async updateProduct(obj, pid) {
    try {
        const updateProduct = await this.productModel.updateOne({_id: pid}, obj)
        return updateProduct;
    } catch (error) {
        throw new Error("Could not update product")
    }
  }

  async getProducts(limit = null) {
    try {
      let products = await this.productModel.find();
      return products;
    } catch (error) {
      throw new Error("hubo un error al pedir los productos");
    }
  }
}

export {productManagerDao}