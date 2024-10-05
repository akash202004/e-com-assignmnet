import mongoose from 'mongoose';

const foodSchema = mongoose.Schema({
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
        enum: ['veg', 'non-veg']
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

export const Food = mongoose.model("Food", foodSchema);