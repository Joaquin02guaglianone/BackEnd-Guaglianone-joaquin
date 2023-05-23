import express from 'express';
import { ProductManager } from "./ProductManager.js";

const app = express();

app.get("/productos", (req, res)=> {
    const prodnew = ProductManager.getProducts()
    const prodLimit =  parseInt(req.query.limit)
    if (!prodLimit) {
        res.send(JSON.stringify(prodnew))
    } else {
        const prodSlice = prodnew.slice(0, prodLimit)
         res.send(JSON.stringify(prodSlice))
    }
})

app.get('/productos/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = ProductManager.getProductsByID(productId);
    if (product) {
        res.send(JSON.stringify(product));
    } else {
        res.send("Producto no encontrado");
    }
});

app.listen(8080, ()=> {
    return console.log("puerto 8080")
})

