import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collectionProductos = "productos" 

const prodSchema = new mongoose.Schema({

   title : {
    type: String,
    required: true
   },

   description : {
    type: String
   },

   price : {
    type: Number,
    required: true,
    min: [0, 'el precio no puede ser negativo']
   },

   thumbnail : {
    type: Array,
    required: true,
    default: []
   },

   code : {
    type: Number,
    required: true,
   },

   stock : {
    type: String,
    required: true,
    index: true
   },

   category : {
    type: Array,
    required: true,
    index: true
   },

   owner: {
      type: String,
      default: "admin"
   }

})

prodSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(collectionProductos,prodSchema);
 
export default productModel

