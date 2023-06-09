import express from "express";
import handlebars from "express-handlebars"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import __dirname from "./util.js";
import { proRoute } from "./routes/productsRoute.js";
import { cartRoute } from "./routes/CartRoute.js";
import { messagesRoute } from "./routes/messagesRoute.js";
import { routerView } from "./routes/viewsRouter.js";
import routerUser from "./routes/userRouter.js";


const app = express();
const serverHttp = app.listen(8080, () => console.log("se ha iniciado la pagina en el puerto", 8080))
const superSecret = "Joaquin02"
const MONGO = `mongodb+srv://joaquinGuaglianone:${superSecret}@back-end-cluster.kle3ie9.mongodb.net/ecommerce`
const connection = mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())

export const socketServer = new Server(serverHttp)

app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')
app.use(cookieParser("coderhouse"))
app.use(session({
  store: new MongoStore({
    mongoUrl: MONGO,
    ttl: 3600
}),

  secret: " coderhouse ",
  resave : " false ",
  saveUninitialize : " false "
}))
app.use(express.static(__dirname + '/public'));
app.use("/", routerView)
app.use("/api/products", proRoute);
app.use("/api/cart", cartRoute)
app.use("/api/messages", messagesRoute)
app.use('/api/sessions', routerUser);

app.get("/session", (req,res) => {
  if (!req.session.count) {
    res.send("bienvenido a la pagina");
    return;
  }

  req.session.count ++
  res.send(`usted a ingresado a la pagina ${req.session.count} veces`)

})

socketServer.on("connection", (socket) => {
  console.log("Usuario conectado", socket.id);

  socket.on('message', (data) => {
    console.log(data)
  })
});