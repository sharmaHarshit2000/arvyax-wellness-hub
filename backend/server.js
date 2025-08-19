import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//Health check
app.get("/", (req, res) => res.send("Arvyax wellnessa Hub API is running"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
