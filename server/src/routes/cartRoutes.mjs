import express from 'express';
import { getCart, addToCart, removeFromCart, updateCartQuantity,clearCart } from '../controllers/cartController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();
router.use(protect); 


router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/remove', removeFromCart);
router.delete("/clear", clearCart);
router.put("/update", updateCartQuantity);

export default router;