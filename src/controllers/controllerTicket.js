import { TicketService } from "../services/serviceTicket.js";

const serviceTicket = new TicketService()

export const createTicket = async (req, res) => {
    try {
        let cid = req.params.cid;
        let email = req.user.email

        let newTicket = await serviceTicket.create(cid, email);

        if (newTicket) {
            res.status(200).send(newTicket)
        } else {
            res.status(400).send("hubo un problema en la creacion del carrito")
        }

    } catch (error) {
       res.status(500).send(error.message)
    }
}