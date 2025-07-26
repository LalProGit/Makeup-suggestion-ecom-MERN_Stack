import express from "express";
import { 
    addAddress, 
    updateAddress, 
    getAddress, 
    updateUserProfile 
} from "../controllers/userController.mjs";
import { protect } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Update user profile (name, lipColorPreference, skinTone, address)
router.put("/profile", protect, updateUserProfile);

// Add address
router.post("/address", protect, addAddress);

// Update address
router.put("/address", protect, updateAddress);

// Get address
router.get("/address", protect, getAddress);

export default router;