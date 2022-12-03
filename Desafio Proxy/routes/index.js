//import homeRouter from "./homeRouter.js";
const homeRouter = require("./homeRouter");
//import loginRouter from "./loginRouter.js";
const loginRouter = require("./loginRouter");
//import signupRouter from "./signupRouter.js";
const signupRouter = require("./signupRouter");
//import productRouter from "./productRouter.js";
const productRouter = require("./productRouter");
//import apiRandomsRouter from "./apiRandomsRouter.js";
const apiRandomsRouter = require("./apiRandomsRouter");
//import logoutRouter from "./logoutRouter.js";
const logoutRouter = require("./logoutRouter");

//import parseArgs from "minimist";
const parseArgs = require("minimist");

// import cluster from "cluster";
//import os from "os";
const os = require("os");

const infoRouter = (req, res) => {
  try {
    const args = parseArgs(process.argv.slice(2));
    const info = {
      argumentos: JSON.stringify(args),
      directorioActual: process.cwd(),
      idProceso: process.pid,
      vNode: process.version,
      rutaEjecutable: process.execPath,
      sistemaOperativo: process.platform,
      memoria: JSON.stringify(process.memoryUsage().rss, null, 2),
      processNum: os.cpus().length,
    };
    res.render("pages/info", info);
  } catch (error) {
    res.render(error.message);
  }
};

module.exports = {
  homeRouter,
  productRouter,
  loginRouter,
  signupRouter,
  apiRandomsRouter,
  logoutRouter,
  infoRouter,
};
