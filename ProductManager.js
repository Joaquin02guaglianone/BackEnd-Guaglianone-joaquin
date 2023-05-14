const fsProds = require("fs")

class Product {

   constructor(title,
      description,
      price,
      thumbnail,
      code,
      stock) {

      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock
      this.Prods = [];
      this.id = 1; 
      this.path = "" ;
   }

   addProducts(title, description, price, thumbnail, code, stock) {
      if (title && description && price && thumbnail && code && stock) {

   let codexist = this.Prods.some((product)=> {return product.code === code})
          if ( codexist !== true ) {
            let id = this.id++
            let NewProds = {
               id,
               title,
               description,
               price,
               thumbnail,
               code,
               stock
            }
            this.Prods.push( NewProds )

          } else {
             console.error("error el code establecido ya existe")
          }
   
      } else {
   
         console.error("error por favor complete todos los campos para agregar un producto")
   
      }

   }

   getProducts(){
      return (

         //  console.log (this.Prods),

           this.Prods)
     
   }

   getProductsByID(id) {

      const idExist = this.Prods.find((productid)=>{return productid.id === id})

      if (idExist) {

         return console.log("se a encontrado el id:", idExist)

      } else {

         console.error("no se ha podido encontrar el producto solicitado con id")

      }

   }
   
   deleteProduct(id) {

      const indice = this.Prods.findIndex((prodid)=>{return prodid.id === id})

      const borrarProd = this.Prods.splice(indice, 1)

      if(indice >= 0 ) {

         return (console.log("se ha borrado el producto:", borrarProd))

      } else {

          return console.log("no se ha podido borrar porque no se encontrado el id")

      }
  }

  updateProduct(id, newproduct) {

   const idproducts = this.Prods.findIndex(idproduct => idproduct.id === id)

   if (idproducts >= 0 ) {

       console.error("Product not found");

       return;
   }
   const productUpdated = {

       ...this.Prods[idproducts],

       ...newproduct

   };
   this.Prods[idproducts] = productUpdated;

   console.log("Producto actualizado");
}

}

const ProductManager = new Product ()

ProductManager.addProducts("uncharted 1", "disco fisico", "$16000", "imagen del uncharted 1", 1, "2000")

ProductManager.addProducts("uncharted 2", "disco fisico", "$10500", "imagen del uncharted 2", 2, "1400")

ProductManager.addProducts("uncharted 3", "disco fisico", "$11000", "imagen del uncharted 3", 3, "1600")

ProductManager.addProducts("uncharted 4", "disco fisico", "$13000", "imagen del uncharted 4", 4, "1100")

ProductManager.addProducts("uncharted lost legacy", "disco fisico", "$15000", "imagen del uncharted lost legacy", 5, "800")

ProductManager.addProducts("uncharted collection", "disco fisico", "$17000", "imagen de la uncharted collection", 6, "500")

ProductManager.addProducts("watch dogs 2", "disco fisico", "$16000", "imagen del watch dogs 2", 7, "3500")

ProductManager.getProductsByID(1)

ProductManager.deleteProduct(1)

ProductManager.getProducts()

// ProductManager.updateProduct(6, { title: "code vein", description: "disco fisico", price: "$13000", thumbnail: "imagen del code vein", cod: "7", stock: "2900" })
// console.log(ProductManager.getProducts())

//node script.js

