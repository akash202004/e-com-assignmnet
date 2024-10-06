import { asyncHandler } from "../utils/asyncHandler.js";
import {Cart} from "../models/cartModel.js"
import {Product} from "../models/productModel.js";

// Add product to cart
const addToCart = asyncHandler(async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Product and quantity are required."
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({
                user: req.user._id,
                items: [],
                totalPrice: 0
            });
        }

        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        cart.totalPrice += product.price * quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to cart",
            data: cart
        });
    } catch (error) {
        console.error("Error in addToCart: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// Get cart items
const getCartItems = asyncHandler(async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price');
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error("Error in getCartItems: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
});

// Update cart item quantity
const updateCartItem = asyncHandler(async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Product and quantity are required."
            });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            if (quantity > 0) {
                cart.items[itemIndex].quantity = quantity;
            } else {
                cart.items.splice(itemIndex, 1);
            }
        } else {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.product.price), 0);
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated",
            data: cart
        });
    } catch (error) {
        console.error("Error in updateCartItem: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
});

// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);  // Remove item
        } else {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        cart.totalPrice = cart.items.reduce((total, item) => total + (item.quantity * item.product.price), 0);
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item removed from cart",
            data: cart
        });
    } catch (error) {
        console.error("Error in removeFromCart: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

// Clear cart
const clearCart = asyncHandler(async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared",
            data: cart
        });
    } catch (error) {
        console.error("Error in clearCart: ", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

export {    addToCart, getCartItems, updateCartItem, removeFromCart, clearCart };
