import { Food } from "../models/foodModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// add food controller
const addFoodController = asyncHandler(async (req, res) => {
    try {
        const { name, description, categories, image, price } = req.body;
        if (!name || !description || !categories || !image || !price) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const food = await Food.create({
            name,
            description,
            categories,
            image,
            price
        })

        res.status(201).json({
            success: true,
            message: "Food added successfully",
            data: food
        });

    } catch (error) {
        console.error("Error in add food: ", error);
        res.status(500).json({
            success: false,
            message: `Error in add food ${error.message}`
        });
    }
});

// update food controller
const updateFoodController = asyncHandler(async (req, res) => {
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

        const updatedFood = await Food.findByIdAndUpdate(
            { _id: foodId },
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Food updated successfully",
            data: updatedFood
        });

    } catch (error) {
        console.error("Error in update food: ", error);
        res.status(500).json({
            success: false,
            message: `Error in update food: ${error.message}`
        });
    }
});

// get all foods controller
const getAllFoodsController = asyncHandler(async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json({
            success: true,
            message: "Foods fetched successfully",
            data: foods
        });
    } catch (error) {
        console.error("Error in get all foods: ", error);
        res.status(500).json({
            success: false,
            message: `Error in get all foods: ${error.message}`
        });
    }
 });

// delete food controller
const deleteFoodController = asyncHandler(async (req, res) => {
    try {
        const foodId = req.params.id;
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(400).json({
                success: false,
                message: "Food not found"
            });
        }

        await Food.findByIdAndDelete(foodId);
        res.status(200).json({
            success: true,
            message: "Food deleted successfully"
        });

    } catch (error) {
        console.error("Error in delete food: ", error);
        res.status(500).json({
            success: false,
            message: `Error in delete food: ${error.message}`
        });
    }
 });

export { addFoodController, updateFoodController, getAllFoodsController, deleteFoodController };
