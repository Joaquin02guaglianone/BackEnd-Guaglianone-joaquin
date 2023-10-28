import productModel from "../models/products.js";
import nodemailer from "nodemailer";
import emailEnv from "../../MaillingConfig.js"

const transport = nodemailer.createTransport(emailEnv.mailing);

class productManagerDao {
  constructor() {
    this.productModel = productModel;
  }

  async addProduct(producto) {
    try {
      const newProduct = await this.productModel.create(producto);
      return newProduct;
    } catch {
      throw new Error("hubo un fallo al agregar el producto");
    }
  }

  async getProductsById(productId) {
    try {
      const productFind = await this.productModel.findById(productId).lean();
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
      const prodId = productId

      if (!prodId) {
        throw new Error("Product not found");
      }

      const product = await this.productModel.findById(prodId)

      const email = product.owner

      transport.sendMail({
        from: `Gaming Center <${emailEnv.mailing.auth.user}>`,
        to: email,
        subject: "Producto retirado",
        html: `<h1> tu producto fue retirado de la tienda </h1>
                          <hr>
                          <p> ${product.title} fue eliminado de la tienda </p>
                  `,
      });

      const productDelete = await this.productModel.findByIdAndDelete(
        prodId
      );

      return productDelete; 

    } catch (error) {
      throw new Error(
        "no se ha podido encontrar y borrar el producto debido a un error"
      );
    }
  }

  async updateProduct(pid, obj) {
    try {
        const updateProduct = await this.productModel.updateOne({_id: pid}, obj)
        return updateProduct;
    } catch (error) {
        throw new Error("Could not update product")
    }
  }

  async getProducts(limit, page, sort, query) {
    try {
      let products = await this.productModel.paginate(
        {query}, {
        limit: limit || 6,
        page : page || 1,
        sort: sort === "asc" ? {price : 1} : sort === "desc" ? {price: -1} : undefined
      });
      return products;
    } catch (error) {
      throw new Error("hubo un error al pedir los productos");
    }
  }
}

export {productManagerDao}



