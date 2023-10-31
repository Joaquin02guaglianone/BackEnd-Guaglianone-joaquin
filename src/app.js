import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express"
import { Server } from "socket.io";
import __dirname from "./util.js";
import { proRoute } from "./routes/productsRoute.js";
import { cartRoute } from "./routes/CartRoute.js";
import { messagesRoute } from "./routes/messagesRoute.js";
import { routerView } from "./routes/viewsRouter.js";
import { userRouter } from "./routes/RouterUsers.js";
import routerUser from "./routes/userRouter.js";
import initializePassport from "./config/passport.config.js";
import { addLogger, loggerInfo } from "./logger/logger.js";

dotenv.config();

const app = express();
app.use(addLogger);

const serverHttp = app.listen(process.env.ServerPort, () => {
  const info = loggerInfo();
  info.info(
    `The server is working correctly on the port ${process.env.ServerPort}`
  );
});


const swaggerOptions = {
  definition: {
    openapi: "3.0.1",

    info: {
      title: "Documentacion API Gaming Center",

      description: "Documentacion api de docs",
    },
  },

  apis: [`${__dirname}/docs/*.yaml`],
};

const MONGO = `mongodb+srv://joaquinGuaglianone:Joaquin02@back-end-cluster.kle3ie9.mongodb.net/ecommerce`;
const connection = mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());


const specs = swaggerJSDoc(swaggerOptions);

export const socketServer = new Server(serverHttp);

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(cookieParser("coderhouse"));
app.use(
  session({
    store: new MongoStore({
      mongoUrl: MONGO,
      ttl: 3600,
    }),

    secret: " coderhouse ",
    resave: " false ",
    saveUninitialize: " false ",
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/public"));
app.use("/", routerView);
app.use("/api/products", proRoute);
app.use("/api/cart", cartRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/sessions", routerUser);
app.use("/api/users", userRouter)
app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

app.get("/api/loggerTest", (req, res) => {
  req.logger.debug("Error debug Dev");
  req.logger.http("HTTP Error Dev");
  req.logger.info("Info Dev");
  req.logger.warning("Warning Dev");
  req.logger.error("Un error");
  // req.logger.fatal("Un error fatal")
  res.send("");
});

app.get("/session", (req, res) => {
  if (!req.session.count) {
    res.send("bienvenido a la pagina");
    return;
  }

  req.session.count++;
  res.send(`usted a ingresado a la pagina ${req.session.count} veces`);
});

socketServer.on("connection", (socket) => {
  console.log("Usuario conectado", socket.id);

  socket.on("message", (data) => {
    console.log(data);
  });
});
