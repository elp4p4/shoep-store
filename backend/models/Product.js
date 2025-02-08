const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    stock: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women"], // Ensure only valid categories
      default: "Men", // Remove if you want to enforce explicit category selection
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, required: true },
        comment: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
