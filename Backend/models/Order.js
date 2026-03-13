import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String
    },

    size: {
        type: String
    },

    quantity: {
        type: Number,
        required: true
    }
});

const addressSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    phone: String
});

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            unique: true
        },

        items: [orderItemSchema],

        address: addressSchema,

        paymentMethod: {
            type: String,
            enum: ["COD", "UPI", "ONLINE"],
            default: "COD"
        },

        total: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

// Generate order id automatically
orderSchema.pre("save", function (next) {
    if (!this.orderId) {
        this.orderId = "ORD-" + Date.now();
    }
    next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;