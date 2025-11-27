import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

// Routes imports
import authRoutes from "./routes/authRoutes.js";

// Routes
app.use("/api/admin", adminAuthRoutes);

app.use("/api/auth", authRoutes);


// Health check
app.get("/", (req, res) => {
  res.send("Millennial Consultants Backend Running...");
});

export default app;
