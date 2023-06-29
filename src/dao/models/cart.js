import mongoose from "mongoose";

const collectionCarts = "carts"

const cartSchema = new mongoose.Schema({ 

products : {

   product : {
    type: String,
    ref: "Product",
    required: true,
    cantidad : {
        type : Number,
        required: true,
        min: 1
       },
   }
}

})

const cartModel = mongoose.model(collectionCarts,cartSchema);

export default cartModel

