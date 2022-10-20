//importamos los modulos
import express from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import session from "express-session";
import { homeRouter, productRouter, loginRouter } from "./routes/index.js";
import { socketController } from "./src/utils/socketController.js";
import MongoStore from "connect-mongo";
import { PORT, MONGOPSW } from "./config.js";
//creamos la app

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
socketController(io);

//configuramos la app
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//vistas
app.set("views", "./views");
app.set("view engine", "ejs");

//configuramos las rutas

app.use("/", homeRouter);
app.use("/productos", productRouter);
app.use("/login", loginRouter);

//configuramos el servidor

const PORT = 8080;

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
    });

server.on("error", (error) => console.log(`Error en servidor ${error}`));

//configuramos el socket

app.use(
    session({
        secret: "secreto",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl:
            "mongodb+srv://lucas:Up7FtUT3J0Q0wZiQ${MONGOPSW}@.cluster0.04v1qpd.mongodb.net/?retryWrites=true&w=majority",
            mongoOptions: advancedOptions,
        }),
    })
);


app.use((req, res, next) => {
    req.session.touch();
    next();
});

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/api/productos", productRouter);
app.use("/login", loginRouter);
app.use("/home", homeRouter);


app.get("/logout", (req, res) => {
    let username = req.session.username;
  
    req.session.destroy((err) => {
      if (err) {
        return res.json({ status: "Logout ERROR", body: err });
      }
      res.render("pages/logout", { name: username });
    });
  });



