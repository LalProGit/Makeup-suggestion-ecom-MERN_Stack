import express from 'express';
import { registerUser, verifyOtpAndCreateUser, loginUser, resetPassword, verifyOtpAndResetPassword } from '../controllers/userController.mjs';

const router = express.Router();

router.post("/register", registerUser);
router.post("/verifyUser", verifyOtpAndCreateUser);
router.post("/login", loginUser);
router.post("/resetPassword", resetPassword);
router.post("/verifyOtpAndResetPassword", verifyOtpAndResetPassword);


export default router;