import mongoose from "mongoose";

const collectionMessages = "messages"

const messagesSchema = new mongoose.Schema({ 

    user: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      }
      
})

const messageModel = mongoose.model(collectionMessages,messagesSchema)

export default messageModel
