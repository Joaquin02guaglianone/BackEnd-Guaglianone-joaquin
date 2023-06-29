import mongoose from "mongoose";

const collectionProductos = "productos" 

const prodSchema = new mongoose.Schema({

   title : {
    type: String,
    required: true
   },

   price : {
    type: Number,
    required: true,
    min: [0, 'el precio no puede ser negativo']
   },

   thumbnail : {
    type: String,
    required: true
   },

   code : {
    type: Number,
    required: true,
    unique: true
   },

   stock : {
    type: String,
    required: true
   },

   category : {
    type: Array,
    required: true
   },

})

const productModel = mongoose.model(collectionProductos,prodSchema);
 
export default productModel

