import express from "express";
import handlebars from "express-handlebars"
import mongoose from "mongoose";
import { Server } from "socket.io";
import __dirname from "./util.js";
import { proRoute } from "./routes/productsRoute.js";
import { cartRoute } from "./routes/CartRoute.js";
import { messagesRoute } from "./routes/messagesRoute.js";
import { routerView } from "./routes/viewsRouter.js";


const app = express();
const serverHttp = app.listen(8080, () => console.log("se ha iniciado la pagina en el puerto", 8080))
const superSecret = "Joaquin02"
const MONGO = `mongodb+srv://joaquinGuaglianone:${superSecret}@back-end-cluster.kle3ie9.mongodb.net/ecommerce`
const connection = mongoose.connect(MONGO)

app.use(express.json())

export const socketServer = new Server(serverHttp)

app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));
app.use("/", routerView)
app.use("/api/products", proRoute);
app.use("/api/cart", cartRoute)
app.use("/api/messages", messagesRoute)

socketServer.on("connection", (socket) => {
    console.log("Usuario conectado", socket.id);
  
    socket.on('message', (data) => {
      console.log(data)
    })
})


