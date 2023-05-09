class Product {
   title = "";
   description = "";
   price = "";
   thumbnail = ""
   code = ""
   stock = ""
 
   constructor(title, description, price, thumbnail, code, stock) {

      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock
   }

}

function addProducts(title,description,price,thumbnail,code,stock) {
   if (title && description && price && thumbnail && code && stock) {

      let NewProds = []
      let Prods = []

      if (code != NewProds.code) {
         let NewProds = {title, description, price, thumbnail, code, stock}
         Prods.push(NewProds)
         console.log({Prods})
      }
      else {
         console.log("error el id establecido ya existe")
      }
      
   } else {

   console.log("error por favor complete todos los campos para agregar un producto")

   }
   
}
addProducts("gta","disco fisico","$16000", "imagen del gta", "1", "2000")
addProducts("ark","disco fisico","$10000", "imagen del ark", "1", "1200")

