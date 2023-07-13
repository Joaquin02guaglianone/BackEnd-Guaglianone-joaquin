import mongoose from "mongoose";

const collectionUsers = "Users";

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
})

const userModel = mongoose.model(collectionUsers, UserSchema);

export default userModel;
