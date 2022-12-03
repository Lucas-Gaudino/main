//import { Router } from "express";
const { Router } = require("express");
//import { productController } from "../controller/productController.js";
const { productController } = require("../controller/productController");

const productRouter = Router();

productRouter.get("/", productController.getData);

//export default productRouter;
module.exports = productRouter;
