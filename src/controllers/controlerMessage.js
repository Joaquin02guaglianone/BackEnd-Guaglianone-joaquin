import { MessageService } from "../services/serviceMessage.js";
import { socketServer } from "../app.js"

const messageService = new MessageService()


export const getMessage = async (req, res) => {
    try {
        const getMessages = await messageService.getAll()

        if(getMessages) {
            res.status(200).send(getMessages)
        }else{
            res.status(404).send("Not messages")
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

export const createMessage = async (req, res) => {
    try {
        const { user, message } = req.body
        const addMessage = await messageService.create(user, message)
        socketServer.emit('getMessage', message)
        if(addMessage) {
            res.status(200).send("Message added")
        }else{
            res.status(404).send("The message could not be added")
        }
    } catch (error) {
        res.status(500).send("Internal server error" + error);
    }
};