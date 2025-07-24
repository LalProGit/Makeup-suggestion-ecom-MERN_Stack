import express from "express";
import {
  getRecommendations,
  addRecommendation,
} from "../controllers/recommendationController.mjs";
import { protect, adminOnly } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.post("/add", protect, adminOnly, addRecommendation);
router.get("/:clothingId", protect, getRecommendations);

export default router;
