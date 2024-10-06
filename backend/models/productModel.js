import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true,
        enum: ['Electronics', 'Cameras', 'Laptops', 'Accessories', 'Headphones', 'Food', 'Books', 'Clothes/Shoes', 'Beauty/Health', 'Sports', 'Outdoor', 'Home']
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})

export const Product = mongoose.model("Product", productSchema);