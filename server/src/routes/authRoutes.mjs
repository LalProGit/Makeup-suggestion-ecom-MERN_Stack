import express from 'express';
import { registerUser, verifyOtpAndCreateUser, loginUser } from '../controllers/userController.mjs';

const router = express.Router();

router.post("/register", registerUser);
router.post("/verifyUser", verifyOtpAndCreateUser);
router.post("/login", loginUser);

export default router;