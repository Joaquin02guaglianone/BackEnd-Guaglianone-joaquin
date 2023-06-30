import mongoose from "mongoose";

export const collectionMessages = "Messages";

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const messageModel = mongoose.model(collectionMessages, messageSchema);

export default messageModel;