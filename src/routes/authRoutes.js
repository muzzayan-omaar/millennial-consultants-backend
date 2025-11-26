import express from "express";
import { registerAdmin, login } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { roleCheck } from "../middleware/roleCheck.js";

const router = express.Router();

// Create admin (protected route)
router.post("/register", protect, roleCheck(["admin"]), registerAdmin);

// Public login
router.post("/login", login);

export default router;
