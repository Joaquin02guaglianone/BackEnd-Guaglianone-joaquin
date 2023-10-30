import {Router} from "express";
import {Product} from "../ProductManager.js";
import { productManagerDao } from "../dao/ManagersDao/productManagerDao.js";
import { CartManagerDao } from "../dao/ManagersDao/cartManagerDao.js";
import MessageManagerMdb from "../dao/ManagersDao/messagesManagerDao.js";
import { authToken, validarToken } from "../util.js";
import { AllUsers, userById } from "../controllers/controllerUsers.js";

export const routerView = Router()

const products = new productManagerDao()
const cart = new CartManagerDao()
const msManager = new MessageManagerMdb()

const publicAccess = (req,res,next) => {
  if(req.session.user) return res.redirect("/products");
  next(); 
}

const privateAccess = (req,res,next) => {
  if(!req.session.user) return res.redirect("/login")
  next()
}

routerView.get('/products', privateAccess, async (req, res) => {
try {
  const limit = parseInt(req.query.limit)
  const page = parseInt(req.query.page)
  const sort = (req.query.sort)
  const query = (req.query.query)

   let productsmgd = await products.getProducts(limit, page, sort, query)

   let productsJSON = productsmgd.docs.map(p=> p.toJSON())

   const productsContext = {
    productos : productsmgd,
    productsDocs : productsJSON,
    };

    res.render('products', {
        title: "Bienvenido a Gaming Center",
        pag: "Gaming Center",
        games: "Juegos Disponibles",
        AllProducts: productsContext.productsDocs,
        productPaginate: productsContext.productos,
        user: req.session.user
    })
} catch (error) {
  throw new Error ("ocurrio un error en el servidor")
}

})

routerView.get("/products/:pid", privateAccess, async (req,res) => {
  try {
      const productsId = (req.params.pid)

  let productoIdentificado = await products.getProductsById(productsId)

  res.render("prodPID", {
    title: "Bienvenido a Gaming Center",
    productoEncontrado : productoIdentificado,
    user : req.session.user
  })
  } catch (error) {
    throw new Error ("ocurrio un error en el servidor")
  }
})

routerView.get("/cart/:cid", privateAccess, async (req,res) => {
  try {
const Cartid = (req.params.cid)

let carritoIdentificado = await cart.getCartId(Cartid)

res.render("cartCID", {
  title: "Bienvenido a Gaming Center",
  carritoEncontrado : carritoIdentificado,
  user : req.session.user
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

routerView.get("/users/", authToken(["admin"]) , async (req,res) => {
  try {
    const userId = (req.params.userid)

    let usersFound = await AllUsers(userId)

    res.render("usuarios", { usuarios: usersFound })

  } catch (error) {
    res.status(500).send("Internal server error");
  }
})

routerView.get("/users/:userid",authToken(["admin"]), async (req,res) => {
  try {
    const userId = (req.params.userid)

    let userFound = await userById(userId)

    console.log(userFound)

    res.render("usuarioId", { usuario: userFound })

  } catch (error) {
    res.status(500).send("Internal server error");
  }
})

routerView.get("/lastScreen", privateAccess, async (req,res) => {
try {
  res.render("completePurchase", {
    user : req.session.user
  })
} catch (error) {
  res.status(500).send("error del server")
}
})

routerView.get('/restore-pass/:token', validarToken, (req, res) => {
  res.render('restore-pass', { token: req.params.token });
})
