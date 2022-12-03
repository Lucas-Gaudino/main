// import { Router } from "express";
// import { apiRandomController } from "../controller/apiRandomController.js";

const { Router } = require("express");
const { apiRandomController } = require("../controller/apiRandomController");
const apiRandomsRouter = Router();

apiRandomsRouter.get("/api/randoms", apiRandomController.get);

apiRandomsRouter.post("/api/randoms", apiRandomController.post);

//export default apiRandomsRouter;
module.exports = apiRandomsRouter;
