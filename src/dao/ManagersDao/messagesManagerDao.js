import messageModel from "../models/messages.js";

export default class MessageManagerMdb {
  constructor() {
    this.messageModel = messageModel;
  }

  async addNewMessage(user, message) {
    try {
      const msg = await this.messageModel.create({ user: user, message: message }); 
      return msg;
    } catch (error) {
      throw new Error("Could not add message");
    }
  }

  async getMessage() {
    try {
      const messages = await this.messageModel.find();
      return messages;
    } catch (error) {
      throw new Error("Could not get messages");
    }
  }
}