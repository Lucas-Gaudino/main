//import { Router } from "express";
const { Router } = require("express");
const loginRouter = Router();
//import { loginController } from "../controller/loginController.js";
const { loginController } = require("../controller/loginController");
//import passport from "passport";
const passport = require("passport");

loginRouter.get("/", loginController.get);
loginRouter.get("/faillogin", loginController.errorLogin);

loginRouter.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/login/faillogin" }),
  loginController.postLogin
);

//export default loginRouter;
module.exports = loginRouter;
