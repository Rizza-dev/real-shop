import  { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  sku: { type: String, required: true, unique: true },
  brand: { type: String },
  category: { type: String },
  images: { type: [String], default: [] },
  availability: {
    type: String,
    enum: ["in_stock", "out_of_stock", "preorder"],
    default: "in_stock",
  },
  weight: { type: Number },
  tags: { type: [String], default: [] },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = models.Product || model("Product", productSchema);

export default Product;