import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import __dirname from "./util.js";
import { proRoute } from "./routes/productsRoute.js";
import { cartRoute } from "./routes/CartRoute.js";
import { routerProductsView } from "./routes/viewsRouter.js";

const app = express();
const serverHttp = app.listen(8080, () => console.log("se ha iniciado la pagina en el puerto", 8080))

app.use(express.json())

export let ioEmitServer 

const io = new Server(serverHttp)

app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'));
app.use("/", routerProductsView)
app.use("/api/products", proRoute);
app.use("/api/cart", cartRoute)

app.set('io', io);

io.on('connection', (socket) =>{
  console.log("el cliente se conecto a la pagina", socket.id)
  socket.on('message', data=>{
  console.log(data)
})
socket.emit('anotherMessage', 'Cliente conectado')
socket.broadcast.emit('anotherMessageButNotForEveryone', 'Ahora te estoy contactando desde el servidor, a todos menos al remitente')
})
