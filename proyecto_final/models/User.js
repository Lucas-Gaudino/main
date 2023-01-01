const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: Number, required: true },
    photo_url: { type: String },
    cart_id: { type: mongoose.Schema.ObjectId },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//     {
//         name: { type: String, required: true },
//         description: { type: String, required: true },
//         code: { type: String, required: true },
//         photo_url: { type: String, required: true },
//         price: { type: Number, required: true },
//         stock: { type: Number, required: true },
//     },
//     { timestamps: true }
// );

// const User = mongoose.model("Product", productSchema);

// module.exports = { User, productSchema };
