import { Product } from "../models/productModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// add product controller
const addProductController = asyncHandler(async (req, res) => {
    try {
        const { name, description, categories, price } = req.body;
        if (!name || !description || !categories || !price) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        let profileImage = '';
        if (req.file) {
            profileImage = req.file.filename;
        } else {
            return res.status(400).json({
                message: 'Profile image is required.'
            });
        }

        const product = await Product.create({
            name,
            description,
            categories,
            image: profileImage,
            price
        })

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product
        });

    } catch (error) {
        console.error("Error in add product: ", error);
        res.status(500).json({
            success: false,
            message: `Error in add product ${error.message}`
        });
    }
});

// update product controller
const updateProductController = asyncHandler(async (req, res) => {
    try {
        const foodId = req.params.id;
        const { name, description, categories, image, price } = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (categories) updateData.categories = categories;
        if (image) updateData.image = image;
        if (price) updateData.price = price;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields to update"
            });
        }

        const updateProduct = await Product.findByIdAndUpdate(
            { _id: foodId },
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updateProduct
        });

    } catch (error) {
        console.error("Error in update Product: ", error);
        res.status(500).json({
            success: false,
            message: `Error in update Product: ${error.message}`
        });
    }
});

// get all products controller
const getAllProductsController = asyncHandler(async (req, res) => {
    try {
        const Products = await Product.find();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: Products
        });
    } catch (error) {
        console.error("Error in get all Products: ", error);
        res.status(500).json({
            success: false,
            message: `Error in get all Products: ${error.message}`
        });
    }
});

// delete product controller
const deleteProductController = asyncHandler(async (req, res) => {
    try {
        const productId = req.params.id;
        const food = await Product.findById(productId);
        if (!food) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            });
        }

        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error("Error in delete Product: ", error);
        res.status(500).json({
            success: false,
            message: `Error in delete Product: ${error.message}`
        });
    }
});

export { addProductController, updateProductController, getAllProductsController, deleteProductController };
