import {Router} from "express";
import {Product} from "../ProductManager.js";

export const routerProductsView = Router()

const productos = new Product("../productos.json")

const prods = productos.getProducts();

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

