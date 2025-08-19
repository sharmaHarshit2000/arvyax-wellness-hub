import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getSessions,
  getMySessions,
  getSessionById,
  saveDraft,
  publishSession,
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/", getSessions); // public routes

router.use(protect); // all below routes are protected

router.get("/my-sessions", getMySessions);
router.get("/my-sessions/:id", getSessionById);
router.post("/my-sessions/save-draft", saveDraft);
router.post("/my-sessions/publish", publishSession);

export default router;
