import express from "express";
import {
  addMakeupProduct,
  getAllMakeupProducts,
  getMakeupProductById,
} from "../controllers/makeupController.mjs";

const router = express.Router();

// GET all makeup products
router.get("/", getAllMakeupProducts);

// GET makeup by ID
router.get("/:id", getMakeupProductById);

// POST new makeup product (admin)
router.post("/add", addMakeupProduct);

export default router;
