import { ProductService } from "../services/serviceProduct.js";
import { addProductError } from "../services/errores/errorInformation.js";
import CustomError from "../services/errores/customError.js";
import EErrors from "../services/errores/Enum.js";

const productService = new ProductService()

export const getAllProducts = async (req, res) => {
    try {
        let products = await productService.getAll();
    
        res.send(JSON.stringify(products));
      } catch (error) {
        res.status(500).send("Internal server error" + error);
      }
};

export const getProductsById = async (req, res) => {
    try {
        const id = req.params.id;
        const productsById = await productService.getById(id);
    
        if (productsById) {
          res.status(200).send(productsById);
        } else {
          res.status(404).send(`No product found with id ${id}`);
        }
      } catch (error) {
        res.status(500).send("Internal server error");
      }
};

export const createProduct = async (req, res) => {
    try {
        let body = req.body;
        let addProduct = await productService.create(body);
    
        if (addProduct) {
          res.status(200).send("Add product successfully");
        } else {
          CustomError.createError({
            name: "error de creacion",
            cause: addProductError(),
            code: EErrors.INVALID_TYPES_ERROR,
            message: "error al crear el producto",
          });
        }
      } catch (error) {
        res.status(500).send("Internal server error");
      }
};

export const updateProduct = async (req, res) => {
    try {
        const idUpdate = req.params.idUpdate;
        const body = req.body;
        const productToUpdate = await productService.update(idUpdate, body);
    
        if (productToUpdate) {
          res.status(200).send(`The product with id ${idUpdate} has been updated successfully`);
        } else {
          res.status(404).send(`There is no product with the id ${idUpdate}`);
        }
      } catch (error) {
        res.status(500).send("Internal server error");
      }
};

export const deleteProduct = async (req, res) => {
    try {
        const idDelete = req.params.idDelete;
        const productToDelete = await productService.delete(idDelete);
    
        if (productToDelete) {
          res.status(200).send(`The product with id ${idDelete} has been deleted successfully`);
        } else {
          res.status(404).send(`There is no product with the id ${idDelete}`);
        }
      } catch (error) {
        res.status(500).send("Internal server error");
      }
};