import express from "express";
import { addClothing, getAllClothing, getClothingById } from "../controllers/clothingController.mjs";
import { protect, adminOnly } from "../middleware/authMiddleware.mjs";
import { uploadClothingImage } from "../middleware/upload.mjs";

const router = express.Router();

router.get("/", getAllClothing);

router.get("/:id", getClothingById);

router.post("/add", protect, adminOnly, uploadClothingImage.single("image"), addClothing);

export default router;
