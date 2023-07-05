import {Router} from "express";
import {Product} from "../ProductManager.js";
import { productManagerDao } from "../dao/ManagersDao/productManagerDao.js";
import { CartManagerDao } from "../dao/ManagersDao/cartManagerDao.js";
import MessageManagerMdb from "../dao/ManagersDao/messagesManagerDao.js";

export const routerView = Router()

const products = new productManagerDao()
const cart = new CartManagerDao()
const msManager = new MessageManagerMdb()

routerView.get('/products', async (req, res) => {

  const limit = parseInt(req.query.limit)
  const page = parseInt(req.query.page)
  const sort = (req.query.sort)
  const query = (req.query.query)

   let productsmgd = await products.getProducts(limit, page, sort, query)

   let productsJSON = productsmgd.docs.map(p=> p.toJSON())

   const productsContext = {
    productos : productsmgd,
    productsDocs : productsJSON
    };

    res.render('products', {
        title: "Bienvenido a Gaming Center",
        pag: "Gaming Center",
        games: "Juegos Disponibles",
        AllProducts: productsContext.productsDocs,
        productPaginate: productsContext.productos
    })
})

routerView.get("/products/:pid", async (req,res) => {
  const productsId = (req.params.pid)

  let productoIdentificado = await products.getProductsById(productsId)

  res.render("prodPID", {
    title: "Bienvenido a Gaming Center",
    productoEncontrado : productoIdentificado
  })
})
 
routerView.get("/cart/:cid", async (req,res) => {

const Cartid = (req.params.cid)

let carritoIdentificado = await cart.getCartId(Cartid)

console.log(carritoIdentificado)

res.render("cartCID", {
  title: "Bienvenido a Gaming Center",
  carritoEncontrado : carritoIdentificado
})

})

routerView.get('/realTimeProducts', (req,res)=>{
    res.render('realTimeProducts', {title: 'Bienvenido a la base gaming', juegos: "nuestros juegos disponibles:"});
})

routerView.get("/messages", async (req, res) => {
  try {
    let getMessages = await msManager.getMessage();
    res.render("messages", { messages: getMessages.map(msg => msg.toJSON()) });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

