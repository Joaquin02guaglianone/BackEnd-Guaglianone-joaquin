import MessageManagerMdb from "../dao/ManagersDao/messagesManagerDao.js";

export class MessageService {
    constructor() {
        this.dao = new MessageManagerMdb();
    }

    async getAll() {
        let getM = await this.dao.getMessage();
        return getM;
    }

    async create(user, message) {
        let createM = await this.dao.addNewMessage(user, message);
        return createM;
    }
} 