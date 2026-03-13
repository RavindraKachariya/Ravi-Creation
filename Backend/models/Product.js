import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        material: {
            type: String,
            enum: ["Wood", "Metal", "Leather", "Plastic", "Fabric"],
            required: true,
        },

        finish: {
            type: String,
            default: "",
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        stock: {
            type: Number,
            default: 0,
            min: 0,
        },

        images: [
            {
                type: String, // image url
            },
        ],

        bestseller: {
            type: Boolean,
            default: false,
        },

        newArrival: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;