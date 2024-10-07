import express from 'express';
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js"
import { addProductController, deleteProductController, getAllProductsController, updateProductController } from '../controllers/productController.js';
import { upload } from "../middlewares/multerSchema.js"

const router = express.Router();

router.post('/create', userAuthMiddleware, upload.single("image"), addProductController);
router.patch('/update/:id', userAuthMiddleware, updateProductController);
router.delete('/delete/:id', userAuthMiddleware, deleteProductController);
router.get('/get-all-products', userAuthMiddleware, getAllProductsController);

export default router;