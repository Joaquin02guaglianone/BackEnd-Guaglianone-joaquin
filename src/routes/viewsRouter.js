import {Router} from "express";
import {Product} from "../ProductManager.js";
import { productManagerDao } from "../dao/ManagersDao/productManagerDao.js";
import { CartManagerDao } from "../dao/ManagersDao/cartManagerDao.js";
import MessageManagerMdb from "../dao/ManagersDao/messagesManagerDao.js";
import { validarToken } from "../util.js";

export const routerView = Router()

const products = new productManagerDao()
const cart = new CartManagerDao()
const msManager = new MessageManagerMdb()

routerView.get('/products', async (req, res) => {
try {
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
} catch (error) {
  throw new Error ("ocurrio un error en el servidor")
}

})

routerView.get("/products/:pid", async (req,res) => {
  try {
      const productsId = (req.params.pid)

  let productoIdentificado = await products.getProductsById(productsId)

  res.render("prodPID", {
    title: "Bienvenido a Gaming Center",
    productoEncontrado : productoIdentificado
  })
  } catch (error) {
    throw new Error ("ocurrio un error en el servidor")
  }
})

routerView.get("/cart/:cid", async (req,res) => {
  try {
const Cartid = (req.params.cid)

let carritoIdentificado = await cart.getCartId(Cartid)

res.render("cartCID", {
  title: "Bienvenido a Gaming Center",
  carritoEncontrado : carritoIdentificado
})
  } catch (error) {
    throw new Error ("ocurrio un error en el servidor")
  }
})

// websockets views

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

// users views 

const publicAccess = (req,res,next) => {
  if(req.session.user) return res.redirect("/products");
  next(); 
}

const privateAccess = (req,res,next) => {
  if(!req.session.user) return res.redirect("/login")
  next()
}

routerView.get("/register", publicAccess, (req, res) => {
  res.render("register")
})

routerView.get("/login", publicAccess, (req, res) => {
  res.render("login")
})

routerView.get("/", privateAccess, (req, res) => {
  res.render("user", {
    user : req.session.user
  })
})

routerView.get('/restore-pass/:token', validarToken, (req, res) => {
  res.render('restore-pass', { token: req.params.token });
})
