import { Router } from "express";
import { signup, login, getMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Get profile
router.get("/me", checkAuth, getMe);

export default router;
