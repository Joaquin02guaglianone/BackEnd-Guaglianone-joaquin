import mongoose from "mongoose";

const collectionUsers = "Users";

const UserSchema = new mongoose.Schema({

        first_name: String,
        last_name: String,
        email: String,
        age: Number,
        password: String,
        userRole: Boolean,
        cart: {
            ref:"carts",
            type: mongoose.Schema.Types.ObjectId,
        }
})

const userModel = mongoose.model(collectionUsers, UserSchema);

export default userModel;

