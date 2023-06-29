import { Router } from "express";
import { messageManager } from "../dao/ManagersDao/messagesManagerDao.js"; 
import { socketServer } from "../app.js";

export const messagesRoute = Router();

const messageDao = new messageManager();

messagesRoute.get("/", async (req,res)=> {
    try {
        const allMessages = messageDao.getMessages();
        res.send(allMessages)
    } catch (error) {
        res.status(400).send("ocurrio un error y no se pudieron encontrar los mensajes")
    }
})

messagesRoute.post("/", async (req,res) => {
 try {
    const { user, message } = req.body;
    const newMessage = await messageManager.addMessage(user, message);
    socketServer.emit("allMessages", message)
    res.send(newMessage)
 } catch (error) {
    res.status(400).send("ocurrio un error y no se pudo crear el mensaje")
 }
})

