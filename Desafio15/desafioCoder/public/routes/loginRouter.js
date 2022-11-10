//import { Router } from "express";
const { Router } = require("express");
const loginRouter = Router();
//import { loginController } from "../controller/loginController.js";
const { loginController } = require("../controller/loginController");
//import passport from "passport";
const passport = require("passport");

loginRouter.get("/login", loginController.get);
loginRouter.get("/login/faillogin", loginController.errorLogin);

loginRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login/faillogin" }),
  loginController.postLogin
);

//export default loginRouter;
module.exports = loginRouter;
