import {Router} from "express";
import {Product} from "../ProductManager.js";
import MessageManagerMdb from "../dao/ManagersDao/messagesManagerDao.js";

export const routerProductsView = Router()

const productos = new Product("../productos.json")
const prods = productos.getProducts();
const msManager = new MessageManagerMdb()

routerProductsView.get('/', (req, res) => {
    res.render('home', {
        title: "Bienvenido a Gaming Center",
        pag: "Gaming Center",
        juegos: "Juegos Disponibles",
        prods
    })
})

routerProductsView.get('/realTimeProducts', (req,res)=>{
    res.render('realTimeProducts', {title: 'Bienvenido a la base gaming', juegos: "nuestros juegos disponibles:"});
})

routerProductsView.get("/messages", async (req, res) => {
  try {
    let getMessages = await msManager.getMessage();
    res.render("messages", { messages: getMessages.map(msg => msg.toJSON()) });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});