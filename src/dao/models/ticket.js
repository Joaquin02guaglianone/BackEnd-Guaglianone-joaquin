import mongoose from "mongoose";

const collectionTickets = "Ticket";

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    purchase_dateTime: {
        type: Date,
        default: Date.now()
    },
    amount: Number,
    purchaser: String,
}
)

const TicketModel = mongoose.model(collectionTickets, TicketSchema);

export default TicketModel;

