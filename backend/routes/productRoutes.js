import express from 'express';
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js"
import { addProductController, deleteProductController, getAllProductsController, updateProductController } from '../controllers/productController.js';

const router = express.Router();

router.post('/create', userAuthMiddleware, addProductController);
router.patch('/update/:id', userAuthMiddleware, updateProductController);
router.delete('/delete', userAuthMiddleware, deleteProductController);
router.get('/get-all-food', userAuthMiddleware, getAllProductsController);

export default router;