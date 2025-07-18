import express from "express";
import { addClothing, getAllClothing, getClothingById } from "../controllers/clothingController.mjs";

const router = express.Router();

router.get("/", getAllClothing);

router.get("/:id", getClothingById);

router.post("/add", addClothing);

export default router;
