import z from 'zod';
import express from 'express';
import { validateSchema } from '../middlewares/validateSchema.js';
import { userLoginController, userRegisterController, userUpdateController } from '../controllers/userController.js';
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js"

// zod schema for user validaiton
const userSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters long." })
        .max(30, { message: "Name must be at most 30 characters long." })
        .optional(),
    email: z.string()
        .email({ message: "Invalid email format." })
        .optional(),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(30, { message: "Password must be at most 30 characters long." })
        .optional(),
});

// router
const router = express.Router();

// routes
router.post('/register', validateSchema(userSchema), userRegisterController);
router.post('/login', validateSchema(userSchema), userLoginController);
router.patch('/update-account', validateSchema(userSchema), userAuthMiddleware, userUpdateController);

export default router;