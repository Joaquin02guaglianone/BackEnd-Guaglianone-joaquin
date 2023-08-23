import { TicketManagerDao} from "../dao/ManagersDao/ticketManagerDao.js";

export class TicketService {
    constructor() {
        this.dao = new TicketManagerDao()
    }

    async create(cid, email) {
        let createT = await this.dao.CreateTicket(cid, email)
        return createT;
    }
}