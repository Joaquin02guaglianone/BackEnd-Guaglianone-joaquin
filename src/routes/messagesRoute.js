import { Router } from "express";
import MessageManagerMdb from "../dao/ManagersDao/messagesManagerDao.js";
import { socketServer } from "../app.js";
import { getMessage, createMessage } from "../controllers/controlerMessage.js";
import { authToken } from "../util.js";


export const messagesRoute = Router();

messagesRoute.get('/',authToken("user"), getMessage);
messagesRoute.post('/',authToken("user"), createMessage);


// const msManager = new MessageManagerMdb()

// messagesRoute.get("/", async (req, res) => {
//     try {
//         const getMessages = await msManager.getMessage()

//         if(getMessages) {
//             res.status(200).send(getMessages)
//         }else{
//             res.status(404).send("Not messages")
//         }
//     } catch (error) {
//         res.status(500).send("Internal server error");
//     }
// })

// messagesRoute.post("/", async (req, res) => {
//     try {
//         let algo = "mensaje agregado"
//         const { user, message } = req.body
//         const addMessage = await msManager.addNewMessage(user, message)
//             socketServer.emit('getMessage', message)
//             socketServer.emit("getUser", user)
//         if(addMessage) {
//             res.status(200).send("Message added")
//         }else{
//             res.status(404).send("The message could not be added")
//         }
//     } catch (error) {
//         res.status(500).send("Internal server error");
//     }
// })