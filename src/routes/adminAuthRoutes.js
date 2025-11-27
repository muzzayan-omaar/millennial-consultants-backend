import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminAuthController.js";

const router = express.Router();

// Register only once → comment/remove later
router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

export default router;
