import express from 'express';
import { protect } from '../middleware/authMiddleware.mjs';
import { getMyOrders, createOrder, payOrder } from '../controllers/orderController.mjs';

const router = express.Router();

router.use(protect);

router.post("/create", createOrder);
router.get("/myorders", getMyOrders);
router.put("/:id/pay", payOrder);

export default router;

