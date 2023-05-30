import express from "express";
import { proRoute } from "./routes/productsRoute.js";
import { cartRoute } from "./routes/CartRoute.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", proRoute);
app.use("/api/cart", cartRoute)

app.listen(8080, () => {
  return console.log("puerto 8080");
});

