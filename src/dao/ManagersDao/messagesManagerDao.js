import messageModel from "../models/messages.js";

class messageManager {
    constructor() {
        this.messageModel = messageModel;
    }

    async getMessages() {
        try {
          const messages = await this.messageModel.find();
          return messages;
        } catch (error) {
          throw new Error("no se pudo encontrar el mensaje");
        }
      }

      async addMessage(user, message) {
        try {
          const newMessage = await this.messageModel.create({ user, message });
          return newMessage;
        } catch (error) {
          throw new Error("no se pudo crear el mensaje");
        }
      }

}

export {messageManager}; 