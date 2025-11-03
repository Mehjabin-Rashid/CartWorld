import express from "express";
import { register, login, logout } from "../Controllers/Users.js";

const router = express.Router();

// Auth routes
router.post("/users/register", register);
router.post("/users/login", login);
router.get("/users/logout", logout);


export default router;
