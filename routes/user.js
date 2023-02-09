import express from "express";
import passport from "passport";
import {
  getAdminStats,
  getAdminUsers,
  logout,
  myProfile,
} from "../controllers/user.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const userRoutes = express.Router();

/* LOGIN WITH GOOGLE */
userRoutes.get(
  "/google/login",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

/* REDIRECT in Login after Google Login */
userRoutes.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile"],
    successRedirect: process.env.FRONTEND_URL,
  }),
  (req, res, next) => {
    res.send("Logged In successfully");
  }
);

/* GET Profile */
userRoutes.get("/me", isAuthenticated, myProfile);

/* Logout */
userRoutes.get("/logout", logout);

/* GET all users by ADMIN */
userRoutes.get("/admin/users", isAuthenticated, authorizeAdmin, getAdminUsers);

/* GET STATS by ADMIN */
userRoutes.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats);

export default userRoutes;
