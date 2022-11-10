//import { Router } from "express";
const { Router } = require("express");
const signupRouter = Router();
//import { signupController } from "../controller/signupController.js";
const { signupController } = require("../controller/signupController");
//import passport from "passport";
const passport = require("passport");

signupRouter.get("/", signupController.get);
signupRouter.get("/failsignup", signupController.errorSignup);

signupRouter.post(
  "/",
  passport.authenticate("signup", { failureRedirect: "/signup/failsignup" }),
  signupController.postsignup
);

//export default signupRouter;
module.exports = signupRouter;
