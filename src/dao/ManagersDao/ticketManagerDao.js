import nodemailer from "nodemailer";
import Ticketmodel from "../models/ticket.js";
import { productManagerDao } from "./productManagerDao.js";
import { CartManagerDao } from "./cartManagerDao.js";
import emailEnv from "../../MaillingConfig.js";

const productDao = new productManagerDao()
const cartDao = new CartManagerDao()

const transport = nodemailer.createTransport(emailEnv.mailing);


export class TicketManagerDao {
    constructor() {
        this.Tmodel =  Ticketmodel;
    }

    async CreateTicket(cid, email) {
        try {
            console.log({cid})
            const cartID = await cartDao.getCartId(cid);
            let totalPrice = 0
            for (const product of cartID) {
                let productID = await productDao.getProductsById(product.product.id)
                if (product.quantity > productID.stock) {
                    throw new Error ("la cantidad solicitada de ", productID.title, " supera el stock actual del producto")
                    return;
                } 
                 
                const productTotalPrice = productID.price * product.quantity;
                totalPrice += productTotalPrice         

                let newStock = parseInt(productID.stock) - product.quantity;

                let newProd = {
                    stock: newStock,
                }
                const actStock = await productDao.updateProduct(productID, newProd)
            }

            const AutomaticCode = String(Math.floor(Math.random()*100000))
        
            
            const ticketBody = {
                code: AutomaticCode,
                amount: totalPrice,
                purchaser: email
           }

           console.log(ticketBody)

           const newTicket = await this.Tmodel.create(ticketBody)
           const emptyCart = await cartDao.deleteCartId(cartID)

           transport.sendMail({
            from: `Gaming Center <${emailEnv.mailing.auth.user}>`,
            to: email,
            subject: "Compra completada",
            html: `<h1> tu compra ha sido procesada sin problemas </h1>
                              <p> este es su ticket de compra </p>
                              <p> ${newTicket}</p>`,
          });

           return (newTicket, emptyCart);
           
        } catch (error) {
            throw new Error (error.message)
        }
    }
}

            // const products = productDao.getProducts()
            // const cart = cartDao.getCartId()
            // const productStock = products.map(product => product.stock)
            // const cartStock = cart.map(products => products.stock)

            // if (cartStock < productStock) {
            //     const Newticket = await this.Tmodel.create(Ticket)
            //     return Newticket;
            // } else {
                
            // }