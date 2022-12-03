//import { fileURLToPath } from "url";
const { fileURLToPath } = require("url");
//import { dirname } from "path";
const { dirname } = require("path");
//import http from "http";
const http = require("http");
//import express from "express";
const express = require("express");
//import session from "express-session";
const session = require("express-session");
//import { Server } from "socket.io";
const { Server } = require("socket.io");
//import mongoose from "mongoose";
const mongoose = require("mongoose");
//import { socketController } from "./src/utils/socketController.js";
const { socketController } = require("./src/utils/socketController");

//import {  homeRouter,  productRouter,  loginRouter,  signupRouter,  apiRandomsRouter,  logoutRouter,  infoRouter,} from "./routes/index.js";
const {
  homeRouter,
  productRouter,
  loginRouter,
  signupRouter,
  apiRandomsRouter,
  logoutRouter,
  infoRouter,
} = require("./routes/index");

//////////////////////// VARIABLES DE ENTORNO

const { PORT, MONGOPSW, MODO } = require("./config");

//////////////////////// Login
//import passport from "passport";
const passport = require("passport");
//import { Strategy as LocalStrategy } from "passport-local";
const { Strategy: LocalStrategy } = require("passport-local");
//import redis from "redis";
const redis = require("redis");
//import connectRedis from "connect-redis";
const connectRedis = require("connect-redis");

//import Usuarios from "./models/usuarioSchema.js";
const Usuarios = require("./models/usuarioSchema");
//import { isValidPassword, createHash } from "./src/utils/passwordsFunctions.js";
const {
  isValidPassword,
  createHash,
} = require("./src/utils/passwordsFunctions");
////////////////////////

////////////////////////
const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

//////////////////////// CONEXION BASE DE DATOS
mongoose
  .connect(
    `mongodb+srv://franchas123:${MONGOPSW}@cluster0.zqkvn9v.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Mongo Atlas");
  })
  .catch((err) => console.log(err));
////////////////////////

//////////////////////// CONFIG LOGINS PASSPORT
passport.use(
  //login es el action
  "login",
  // callback, importante respetar username y password
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        console.log("User not found with username " + username);
        return done(null, false);
        //null significa sin error, y false parametro a enviar
      }
      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

//////////////////////// CONFIG signup PASSPORT
passport.use(
  //login es el action
  "signup",
  new LocalStrategy(
    //aca indicas que siempre necesitas password, y pasa todo el request al callback.
    //Por ejemplo si pasaras mas props y no solo username y password
    { passReqToCallback: true },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (error, user) {
        if (error) {
          console.log("Error in SingnUp: " + error);
          return done(error);
        }
        if (user) {
          console.log("User already exists");
          return done(null, false);
        }
        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, user) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log("User Registration succesful");
          //con lo siguiente quedas logueado, creas la session
          return done(null, user);
        });
      });
    }
  )
);

//////////////////////// PASSPORT NECESSARY MIDDLEWARES
//passport necesita hacer esto con todas las sesiones, debido a que tiene muchas estrategias, para poder guardar la sesion
passport.serializeUser((user, done) => {
  done(null, user._id);
});
// lo busca en base de datos
passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

//////////////////////// CONFIGURACION REDIS
const client = redis.createClient({ legacyMode: true });
client.connect();
const RedisStore = connectRedis(session);

app.use(
  session({
    store: new RedisStore({ host: "localhost", port: 6379, client, ttl: 300 }),
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 86400000, // 1 dia
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

//////////////////////// MIDDLEWARE ACCESO A CARPETA PUBLIC
app.use(express.static(__dirname + "/public"));

//////////////////////// MOTOR DE PLANTILLA
app.set("view engine", "ejs");
app.set("views", "./views");

//////////////////////// LECTURA FORMATO JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//////////////////////// MIDDLEWARE PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//////////////////////// REFRESH MAXAGE
app.use((req, res, next) => {
  req.session.touch();
  next();
});

//////////////////////// RUTAS
app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/api/products-test", productRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/home", homeRouter);
app.use(apiRandomsRouter);
app.use("/logout", logoutRouter);
app.use("/info", infoRouter);
////////////////////////

//////////////////////// SERVIDOR FORK FOREVER
const cluster = require("cluster");
const os = require("os");
const numCPUs = os.cpus().length;
if (MODO === "CLUSTER") {
  if (cluster.isPrimary) {
    console.log("MODO CLUSTER");
    console.log("Servidor Funcionando en Puerto: " + PORT);
    console.log(`Master es el PID ${process.pid} `);
    // fork workers.
    console.log(numCPUs);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      cluster.fork();
      console.log(`worker ${worker.process.pid} murio`);
    });
  } else {
    const httpServer = http.createServer(app);
    httpServer.listen(PORT, () => {
      console.log(`inicie un Worker nuevo ${process.pid}`);
    });
    ////////////////////// SOCKET
    const io = new Server(httpServer, {});
    socketController(io);
    /////////////////////
  }
} else {
  const httpServer = http.createServer(app);
  //////////////////////// SOCKET
  const io = new Server(httpServer, {});
  socketController(io);
  ///////////////////////
  httpServer.listen(PORT, () => {
    console.log("Servidor Funcionando en Puerto: " + PORT);
    console.log("MODO FORK");
  });
  httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));
}

//////////////PM2

// const httpServer = http.createServer(app);
// httpServer.listen(PORT, () => {
//   console.log(PORT);
//   console.log("Servidor Funcionando en Puerto: " + PORT);
// });
// httpServer.on("error", (error) => console.log(`Error en servidor ${error}`));
// const io = new Server(httpServer, {});
// socketController(io);

//////////////////////// MANEJO DE ERROR DE REQUEST
app.all("*", (req, res) => {
  res.status(404).send("Ruta no encontrada");
});
