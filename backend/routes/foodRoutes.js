import express from 'express';
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js"
import { addFoodController, deleteFoodController, getAllFoodsController, updateFoodController } from '../controllers/foodController.js';

const router = express.Router();

router.post('/create', userAuthMiddleware, addFoodController);
router.patch('/update', userAuthMiddleware, updateFoodController);
router.delete('/delete', userAuthMiddleware, deleteFoodController);
router.get('/get-all-food', userAuthMiddleware, getAllFoodsController);

export default router;