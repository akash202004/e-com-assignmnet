import express from 'express';
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js"
import { addToCart, clearCart, getCartItems, removeFromCart, updateCartItem } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', userAuthMiddleware, addToCart);
router.get('/', userAuthMiddleware, getCartItems);
router.put('/update', userAuthMiddleware, updateCartItem);
router.delete('/remove/:productId', userAuthMiddleware, removeFromCart);
router.delete('/clear', userAuthMiddleware, clearCart);

export default router;