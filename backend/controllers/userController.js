import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

// User register controller
const userRegisterController = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email }).lean();
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists!! Please login'
            })
        }

        const newUser = await User.create({ name, email, password })
        if (!newUser) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user data'
            })
        }

        const user = await User.findById(newUser._id).select('-password').lean();
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user data'
            });
        }

        const token = newUser.token();
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Error in generating token'
            });
        }

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user,
            token: token
        })
    } catch (error) {

        console.error("Error in user registration: ", error);
        res.status(500).json({
            success: false,
            message: `Error in user registeration ${error.message}`
        });
    }
})

// User login controller
const userLoginController = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            })
        }

        const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            })
        }

        const user = await User.findById(existingUser._id).select('-password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user data'
            });
        }

        const token = user.token();
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Error in generating token'
            })
        }

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: user,
            token: token
        })
    } catch (error) {

        console.error("Error in user login: ", error);
        res.status(500).json({
            success: false,
            message: `Error in user login ${error.message}`
        });
    }
})

// User update profile controller
const userUpdateController = asyncHandler(async (req, res) => {
    try {
        const { name, password } = req.body;

        const userSchema = {
            ...(name && { name }),
            ...(password && { password: await bcrypt.hash(password, 10) })
        }

        const user = await User.findByIdAndUpdate(req.user._id, userSchema, { new: true }).select('-password').lean();
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user
        })
    } catch (error) {

        console.error("Error in user details update: ", error);
        res.status(500).json({
            success: false,
            message: `Error in user details update ${error.message}`
        });
    }
})

export { userRegisterController, userLoginController, userUpdateController }